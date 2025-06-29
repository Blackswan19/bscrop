document.addEventListener('DOMContentLoaded', () => {
            const logoImg = document.querySelector('.logo img');
            if (logoImg) {
                logoImg.addEventListener('error', () => {
                    logoImg.parentElement.style.display = 'none';
                    document.querySelector('h4').style.marginTop = '10px';
                    displayError('API address error: Failed to load logo image.');
                });
            } else {
                document.querySelector('.logo').style.display = 'none';
                document.querySelector('h4').style.marginTop = '10px';
            }

            // Check if html2pdf.js is loaded
            if (typeof html2pdf === 'undefined') {
                displayError('API address error: PDF generation library not loaded.');
                const downloadButton = document.querySelector('button');
                if (downloadButton) downloadButton.disabled = true;
            }
        });
        function generatePDF() {
            try {
                // Simulate a PDF API address error by throwing an error
                throw new Error('PDF API address error: Unable to connect to PDF generation service.');
            } catch (error) {
                displayError(error.message);
            }
        }
        function displayError(message) {
            const errorElement = document.getElementById('error-message');
            if (errorElement) {
                errorElement.textContent = message;
            } else {
                alert(message);
            }
            console.error(message);
        }

        function generatepdf() {
            try {
                const element = document.querySelector('.invoice');
                if (!element) {
                    displayError('Error: Invoice element not found.');
                    return;
                }

                const logoImg = document.querySelector('.logo img');
                let logoLoaded = true;
                if (logoImg) {
                    logoLoaded = logoImg.complete && logoImg.naturalHeight !== 0;
                    if (!logoLoaded) {
                        displayError('API address error: Logo image failed to load.');
                    }
                }

                const qty = parseFloat(document.getElementById('qty').value) || 0;
                const amount = parseFloat(document.getElementById('amount').value) || 0;
                const total = qty * amount;
                document.getElementById('total').textContent = isNaN(total) ? '0.00' : total.toFixed(2);

                const clonedElement = element.cloneNode(true);

                if (!logoLoaded) {
                    const clonedLogo = clonedElement.querySelector('.logo');
                    if (clonedLogo) clonedLogo.style.display = 'none';
                    const clonedH4 = clonedElement.querySelector('h4');
                    if (clonedH4) clonedH4.style.marginTop = '10px';
                }

                const button = clonedElement.querySelector('button');
                if (button) button.remove();
                const filenameInput = clonedElement.querySelector('.filename-input');
                if (filenameInput) filenameInput.remove();

                clonedElement.querySelectorAll('.highlight').forEach(highlight => {
                    highlight.style.backgroundColor = 'transparent';
                    const input = highlight.querySelector('input');
                    const textarea = highlight.querySelector('textarea');
                    if (input) {
                        const value = input.value || '';
                        highlight.innerHTML = value;
                    } else if (textarea) {
                        const value = textarea.value || '';
                        const div = document.createElement('div');
                        div.style.whiteSpace = 'pre-wrap';
                        div.style.lineHeight = '1.4';
                        div.style.fontSize = '14px';
                        div.style.fontFamily = '"Times New Roman", Times, serif';
                        div.textContent = value;
                        highlight.innerHTML = '';
                        highlight.appendChild(div);
                    }
                });

                const filenameValue = document.getElementById('filename').value.trim();
                const filename = filenameValue ? `${filenameValue}.pdf` : 'invoice.pdf';

                if (typeof html2pdf === 'undefined') {
                    displayError('API address error: PDF generation library not loaded.');
                    return;
                }

                html2pdf().from(clonedElement).set({
                    margin: [10, 10, 10, 10],
                    filename: filename,
                    jsPDF: { 
                        unit: 'mm', 
                        format: 'a4', 
                        orientation: 'portrait', 
                        compress: false 
                    },
                    html2canvas: { 
                        scale: 2,
                        dpi: 192,
                        logging: true,
                        useCORS: true
                    },
                    autoPaging: 'text'
                }).save().catch(error => {
                    displayError(`API address error: Failed to generate PDF - ${error.message}`);
                });
            } catch (error) {
                displayError(`API address error: ${error.message}`);
            }
        }
