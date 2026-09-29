const yearEl = document.querySelector('#current-year');
const resourceModal = document.querySelector('#resource-modal');
const resourceList = document.querySelector('#resource-file-list');
const resourceTitle = document.querySelector('#resource-modal-title');
const resourceCategory = document.querySelector('#resource-modal-category');
const resourceDescription = document.querySelector('#resource-modal-description');
const pdfConfirmation = document.querySelector('#pdf-confirmation');
const pdfConfirmationName = document.querySelector('#pdf-confirmation-name');
let pendingPdf = null;

if (yearEl) yearEl.textContent = new Date().getFullYear();

// Remove the retired popup markup so only the new resource window can open.
document.querySelectorAll('#prelim-modal, #assignment-modal').forEach((modal) => modal.remove());

const resources = {
    performance: {
        label: 'Performance Tasks',
        description: 'Select a member to view their submitted performance tasks.',
        files: {
            marina: {
                prelim: [
                    ['PT1 - Laboratory Activity No. 1.2.1', 'files/marina-pdf/performance-tasks/prelim/PT1%20-%20LABORATORY%20ACTIVITY%20NO%201.2.1.pdf'],
                    ['PT1 - Laboratory Activity No. 1.2.2', 'files/marina-pdf/performance-tasks/prelim/PT1%20-%20LABORATORY%20ACTIVITY%20NO%201.2.2.pdf'],
                    ['PT1 - Laboratory Activity No. 1.3.3', 'files/marina-pdf/performance-tasks/prelim/PT1%20-%20LABORATORY%20ACTIVITY%20NO%201.3.3.pdf'],
                    ['PT1 - Laboratory Activity No. 1.4.4', 'files/marina-pdf/performance-tasks/prelim/PT1%20-%20LABORATORY%20ACTIVITY%20NO%201.4.4.pdf'],
                    ['PT1 - Laboratory Activity No. 1.4.5', 'files/marina-pdf/performance-tasks/prelim/PT1%20-%20LABORATORY%20ACTIVITY%20NO%201.4.5.pdf'],
                    ['PT1 - Laboratory Activity No. 1.5.6', 'files/marina-pdf/performance-tasks/prelim/PT1%20-%20LABORATORY%20ACTIVITY%20NO%201.5.6.pdf']
                ],
                midterm: [
                    ['PT2 - M2U3 Midterms Lab Exercise 8', 'files/marina-pdf/performance-tasks/midterm/PT2%20-%20M2U3%20Midterms%20Lab%20Exercise%208.pdf'],
                    ['PT2 - M2U3 Midterms Lab Exercise 9', 'files/marina-pdf/performance-tasks/midterm/PT2%20-%20M2U3%20Midterms%20Lab%20Exercise%209.pdf.pdf'],
                    ['PT2 - M2U4 Midterms Lab Exercise 10', 'files/marina-pdf/performance-tasks/midterm/PT2%20-%20M2U4%20Midterms%20Lab%20Exercise%2010.pdf.pdf'],
                    ['PT2 - M3U1 Midterms Lab Exercise 11', 'files/marina-pdf/performance-tasks/midterm/PT2%20-%20M3U1%20Midterms%20Lab%20Exercise%2011.pdf.pdf'],
                    ['PT2 - M3U3 Midterms Lab Exercise 13', 'files/marina-pdf/performance-tasks/midterm/PT2%20-%20M3U3%20Midterms%20Lab%20Exercise%2013.pdf.pdf'],
                    ['PT2 - M3U3 Midterms Lab Exercise 14', 'files/marina-pdf/performance-tasks/midterm/PT2%20-%20M3U3%20Midterms%20Lab%20Exercise%2014.pdf.pdf']
                ]
            }
        }
    },
    assignment: {
        label: 'Assignments',
        description: 'Select a member to view their submitted assignments.',
        files: {
            marina: {
                prelim: [
                    ['WW1-M1U1 Assignment 1', 'files/marina-pdf/assignments/prelim/WW1-M1U1%20Assignment%201.pdf'],
                    ['WW1 - M1U3 Prelims Assignment 2', 'files/marina-pdf/assignments/prelim/WW1%20-%20M1U3%20Prelims%20Assignment%202.pdf'],
                    ['WW1 - M1U4_U5 Prelims Assignment 3', 'files/marina-pdf/assignments/prelim/WW1%20-%20M1U4_U5%20Prelims%20Assignment%203.pdf'],
                    ['WW1 - M2U1_U2 Prelims Assignment 4', 'files/marina-pdf/assignments/prelim/WW1%20-%20M2U1_U2%20Prelims%20Assignment%204.pdf']
                ],
                midterm: [
                    ['WW2 - M2U3 Midterms Assignment 5', 'files/marina-pdf/assignments/midterm/WW2%20-%20M2U3%20Midterms%20Assignment%205.pdf'],
                    ['M2U4 Midterms Assignment 6', 'files/marina-pdf/assignments/midterm/M2U4%20Midterms%20Assignment%206.pdf'],
                    ['WW2 - M3U1 Midterms Assignment 7', 'files/marina-pdf/assignments/midterm/WW2%20%E2%80%93%20M3U1%20Midterms%20Assignment%207.pdf'],
                    ['WW2 - M3U2 Midterms Assignment 8', 'files/marina-pdf/assignments/midterm/WW2%20%E2%80%93%20M3U2%20Midterms%20Assignment%208.pdf'],
                    ['WW2 - M3U3 Midterms Assignment 9', 'files/marina-pdf/assignments/midterm/WW2%20-%20M3U3%20Midterms%20Assignment%209.pdf'],
                    ['WW2 - M3U5_M4U1 Assignment 10', 'files/marina-pdf/assignments/midterm/WW2%20-%20M3U5_M4U1%20Assignment%2010.pdf']
                ]
            }
        }
    }
};

let currentResource = 'performance';
let currentTerm = 'prelim';
let currentMember = 'marina';

const getFileName = (href) => decodeURIComponent(href.split('/').pop()).replace(/\.pdf\.pdf$/i, '.pdf');

const renderResources = () => {
    const group = resources[currentResource];
    const files = group.files[currentMember]?.[currentTerm] || [];
    resourceCategory.textContent = group.label;
    resourceTitle.textContent = `${currentTerm === 'prelim' ? 'Prelim' : 'Midterm'} ${group.label}`;
    resourceDescription.textContent = group.description;
    resourceList.innerHTML = files.length ? files.map(([, href]) => {
        const fileName = getFileName(href);
        return `
        <div class="file-item"><span>${fileName}</span><a class="file-open" href="${href}" aria-label="Open ${fileName}"><img src="image/icons/open.png" alt="Open PDF"></a></div>
    `;
    }).join('') : '<p class="modal__empty">No files have been submitted for this member yet.</p>';
};

const setModal = (isOpen) => {
    resourceModal.classList.toggle('is-open', isOpen);
    resourceModal.setAttribute('aria-hidden', String(!isOpen));
    document.body.classList.toggle('modal-open', isOpen);
    if (isOpen) renderResources();
};

const setPdfConfirmation = (isOpen) => {
    pdfConfirmation.classList.toggle('is-open', isOpen);
    pdfConfirmation.setAttribute('aria-hidden', String(!isOpen));
};

document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-resource]');
    if (trigger) {
        currentResource = trigger.dataset.resource;
        currentTerm = trigger.dataset.term;
        currentMember = 'marina';
        document.querySelectorAll('.member-selector__button').forEach((button) => {
            button.classList.toggle('is-selected', button.dataset.member === currentMember);
        });
        setModal(true);
        return;
    }

    const memberButton = event.target.closest('.member-selector__button');
    if (memberButton) {
        currentMember = memberButton.dataset.member;
        document.querySelectorAll('.member-selector__button').forEach((button) => {
            button.classList.toggle('is-selected', button === memberButton);
        });
        renderResources();
        return;
    }

    const fileButton = event.target.closest('.file-open');
    if (fileButton) {
        event.preventDefault();
        pendingPdf = fileButton.href;
        pdfConfirmationName.textContent = fileButton.closest('.file-item').querySelector('span').textContent;
        setPdfConfirmation(true);
        return;
    }

    if (event.target.closest('.pdf-confirmation__cancel') || event.target === pdfConfirmation) {
        pendingPdf = null;
        setPdfConfirmation(false);
        return;
    }

    if (event.target.closest('.pdf-confirmation__open') && pendingPdf) {
        window.open(pendingPdf, '_blank', 'noopener');
        pendingPdf = null;
        setPdfConfirmation(false);
        return;
    }

    if (event.target.closest('.modal__close') || event.target === resourceModal) setModal(false);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (pdfConfirmation.classList.contains('is-open')) setPdfConfirmation(false);
        else if (resourceModal.classList.contains('is-open')) setModal(false);
    }
});
