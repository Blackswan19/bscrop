document.addEventListener('DOMContentLoaded', () => {
            const logoImg = document.querySelector('.logo img');
            logoImg.addEventListener('error', () => {
                logoImg.parentElement.style.display = 'none';
                document.querySelector('h2').style.marginTop = '10px';
            });

            const downloadButton = document.querySelector('button');
            if (downloadButton) {
                downloadButton.addEventListener('click', generatePDF);
            } else {
                console.error('Download button not found');
                alert('Error: Download button not found.');
            }
        });

        function generatePDF() {
            try {
                const element = document.querySelector('.invoice');
                if (!element) {
                    console.error('Invoice element not found');
                    alert('Error: Invoice element not found.');
                    return;
                }

                const logoImg = document.querySelector('.logo img');
                const logoLoaded = logoImg && logoImg.complete && logoImg.naturalHeight !== 0;

                const qty = parseFloat(document.getElementById('qty').value) || 0;
                const amount = parseFloat(document.getElementById('amount').value) || 0;
                const total = qty * amount;
                document.getElementById('total').textContent = isNaN(total) ? '0.00' : total.toFixed(2);

                const clonedElement = element.cloneNode(true);

                if (!logoLoaded) {
                    clonedElement.querySelector('.logo').style.display = 'none';
                    clonedElement.querySelector('h2').style.marginTop = '10px';
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
                const filename = filenameValue ? `${filenameValue}#bs.pdf` : 'invoice#bs.pdf';

                if (typeof html2pdf === 'undefined') {
                    console.error('html2pdf.js is not loaded');
                    alert('Error: PDF generation library not loaded.');
                    return;
                }

                html2pdf().from(clonedElement).set({
                    margin: [10, 10, 10, 10], /* Top, right, bottom, left margins set to 10px */
                    filename: filename,
                    jsPDF: { 
                        unit: 'mm', 
                        format: 'a4', 
                        orientation: 'portrait', 
                        compress: false 
                    },
                    html2canvas: { 
                        scale: 6,
                        dpi: 192,
                        logging: true,
                        useCORS: true
                    },
                    
                    autoPaging: 'text'
                }).save();
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('An error occurred while generating the PDF.');
            }
        }

        function checkPassword() {
            const input = document.getElementById('passwordInput').value;
            const errorMessage = document.getElementById('errorMessage');
            const successMessage = document.getElementById('successMessage');
            const passwordContainer = document.getElementById('passwordContainer');
            const correctPin = 'E@Mu1K';

            if (input === correctPin) {
                passwordContainer.classList.add('hidden');
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000); // Hide success message after 3 seconds
                localStorage.setItem('lastLogin', new Date().toISOString());
            } else {
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            }
        }

        function checkLoginStatus() {
            const lastLogin = localStorage.getItem('lastLogin');
            const passwordContainer = document.getElementById('passwordContainer');
            
            if (!lastLogin) {
                passwordContainer.classList.remove('hidden');
                return;
            }

            const lastLoginDate = new Date(lastLogin);
            const currentDate = new Date();
            const diffTime = Math.abs(currentDate - lastLoginDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > 10) {
                passwordContainer.classList.remove('hidden');
            } else {
                passwordContainer.classList.add('hidden');
            }
        }

        function downloadPDF() {
            const element = document.querySelector('.invoice');
            const filename = document.getElementById('filename').value || 'invoice';
            const opt = {
                margin: 0.5,
                filename: `${filename}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // Hide editable inputs and show their values as plain text for PDF
            const inputs = document.querySelectorAll('.highlight input, .highlight textarea');
            inputs.forEach(input => {
                const span = document.createElement('span');
                span.textContent = input.value;
                input.parentNode.replaceChild(span, input);
            });

            html2pdf().set(opt).from(element).save().then(() => {
                // Restore inputs after PDF generation
                location.reload();
            });
        }
