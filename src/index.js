
    // Get DOM elements
    const form = document.getElementById('placeholderForm');
    const resultDiv = document.getElementById('result');
    const placeholderLink = document.getElementById('placeholderLink');
    const placeholderImage = document.getElementById('placeholderImage');
    const bgColorInput = document.getElementById('bgColor');
    const bgColorPicker = document.getElementById('bgColorPicker');
    const textColorInput = document.getElementById('textColor');
    const textColorPicker = document.getElementById('textColorPicker');

    // Set default colors
    bgColorInput.value = '000000';
    textColorInput.value = 'FFFFFF';
    bgColorPicker.value = '#000000';
    textColorPicker.value = '#FFFFFF';

    // Validate hex color
    function isValidHex(hex) {
        return /^[0-9A-Fa-f]{6}$/.test(hex);
    }

    bgColorPicker.addEventListener('input', (e) => {
        bgColorInput.value = e.target.value.substring(1);
    });

    bgColorInput.addEventListener('input', (e) => {
        const hex = e.target.value;
        if (isValidHex(hex)) {
            bgColorPicker.value = '#' + hex;
            bgColorInput.classList.remove('border-red-500');
        } else {
            bgColorInput.classList.add('border-red-500');
        }
    });

    textColorPicker.addEventListener('input', (e) => {
        textColorInput.value = e.target.value.substring(1);
    });

    textColorInput.addEventListener('input', (e) => {
        const hex = e.target.value;
        if (isValidHex(hex)) {
            textColorPicker.value = '#' + hex;
            textColorInput.classList.remove('border-red-500');
        } else {
            textColorInput.classList.add('border-red-500');
        }
    });

    // Form submission
    function validateSize(value, field) {
        const size = parseInt(value);
        if (size < 150 || size > 3000) {
            document.getElementById(field).classList.add('border-red-500');
            throw new Error(`${field} must be between 150 and 3000 pixels`);
        }
        document.getElementById(field).classList.remove('border-red-500');
        return size;
    }

    // Replace form submission with enhanced validation
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            // Validate sizes
            const width = validateSize(document.getElementById('width').value, 'width');
            const height = validateSize(document.getElementById('height').value, 'height');
            
            // Validate colors
            if (!isValidHex(bgColorInput.value)) {
                throw new Error('Invalid background color hex code');
            }
            if (!isValidHex(textColorInput.value)) {
                throw new Error('Invalid text color hex code');
            }

            const text = document.getElementById('text').value;
            const bgColor = bgColorInput.value.toUpperCase();
            const textColor = textColorInput.value.toUpperCase();

            // Validate text length
            if (text && new TextEncoder().encode(text).length > 16) {
                throw new Error('Text exceeds 16 bytes limit');
            }

            // Generate URL with validation
            const url = new URL(`https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}`);
            if (text) url.searchParams.set('text', text);

            // Add loading timeout
            const loadingTimeout = setTimeout(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Timeout',
                    text: 'Image generation took too long. Please try again.',
                    background: 'rgb(17 24 39)',
                    color: 'rgb(202 138 4)'
                });
            }, 10000);

            // Show loading
            Swal.fire({
                title: 'Generating...',
                allowOutsideClick: false,
                showConfirmButton: false,
                background: 'rgb(17 24 39)',
                color: 'rgb(202 138 4)',
                didOpen: () => Swal.showLoading()
            });

            // Load image with timeout clear
            const img = new Image();
            img.src = url.toString();
            
            img.onload = () => {
                clearTimeout(loadingTimeout);
                placeholderLink.href = url.toString();
                placeholderLink.textContent = url.toString();
                placeholderImage.src = url.toString();
                placeholderImage.classList.remove('hidden');
                resultDiv.classList.remove('hidden');
                Swal.close();
                
                // Add success notification
                Swal.fire({
                    icon: 'success',
                    title: 'Image Generated!',
                    text: 'Click the link to copy URL',
                    timer: 2000,
                    background: 'rgb(17 24 39)',
                    color: 'rgb(202 138 4)',
                    showConfirmButton: false
                });
            };

            img.onerror = () => {
                clearTimeout(loadingTimeout);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to generate image. Please verify your inputs and try again.',
                    background: 'rgb(17 24 39)',
                    color: 'rgb(202 138 4)',
                    showConfirmButton: true,
                    confirmButtonText: 'Retry',
                    showCancelButton: true,
                    cancelButtonText: 'Close'
                }).then((result) => {
                    if (result.isConfirmed) {
                        form.dispatchEvent(new Event('submit'));
                    }
                });
                resultDiv.classList.add('hidden');
            };

            // Add click-to-copy functionality
            placeholderLink.addEventListener('click', async (e) => {
                e.preventDefault();
                try {
                    await navigator.clipboard.writeText(url.toString());
                    Swal.fire({
                        icon: 'success',
                        title: 'URL Copied!',
                        timer: 1500,
                        background: 'rgb(17 24 39)',
                        color: 'rgb(202 138 4)',
                        showConfirmButton: false
                    });
                } catch (err) {
                    console.error('Failed to copy URL:', err);
                }
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: error.message,
                background: 'rgb(17 24 39)',
                color: 'rgb(202 138 4)'
            });
        }
    });