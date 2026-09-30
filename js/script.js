const yearEl = document.querySelector('#current-year');
const resourceModal = document.querySelector('#resource-modal');
const resourceList = document.querySelector('#resource-file-list');
const resourceCategory = document.querySelector('#resource-modal-category');
const resourceDescription = document.querySelector('#resource-modal-description');
const memberView = document.querySelector('[data-resource-view="members"]');
const fileView = document.querySelector('[data-resource-view="files"]');
const resourceSelectLabel = document.querySelector('#resource-modal-select-label');

const setResourceView = (view) => {
    const showFiles = view === 'files';
    memberView.classList.toggle('is-active', !showFiles);
    fileView.classList.toggle('is-active', showFiles);
    memberView.setAttribute('aria-hidden', String(showFiles));
    fileView.setAttribute('aria-hidden', String(!showFiles));
    resourceSelectLabel.textContent = showFiles ? 'Select File' : 'Select Member';
};

const resetMemberSelection = () => {
    currentMember = null;
    document.querySelectorAll('.resource-modal .member-selector__button').forEach((button) => {
        button.classList.remove('is-selected');
    });
    setResourceView('members');
};

if (yearEl) yearEl.textContent = new Date().getFullYear();

const setupMediaLoading = (root = document) => {
    root.querySelectorAll('img, video').forEach((media) => {
        const finishLoading = () => media.classList.remove('media-loading');
        const isReady = media.tagName === 'VIDEO' ? media.readyState >= 3 : media.complete;

        if (isReady) {
            finishLoading();
            return;
        }

        media.classList.add('media-loading');
        media.addEventListener('load', finishLoading, { once: true });
        media.addEventListener('loadeddata', finishLoading, { once: true });
        media.addEventListener('error', finishLoading, { once: true });
    });
};

setupMediaLoading();

const fadeInTargets = document.querySelectorAll('.members, .tasks, .member-card, .task-card');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    fadeInTargets.forEach((target) => target.classList.add('is-visible'));
} else if ('IntersectionObserver' in window) {
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
    }, { threshold: 0 });

    fadeInTargets.forEach((target) => {
        target.classList.add('scroll-fade-in');
        fadeInObserver.observe(target);
    });
} else {
    fadeInTargets.forEach((target) => target.classList.add('is-visible'));
}

const hero = document.querySelector('.hero');
if (hero) {
    hero.classList.add('media-loading');
    const heroBackground = new Image();
    heroBackground.src = "image/pictures/jru-bg.png";
    heroBackground.addEventListener('load', () => hero.classList.remove('media-loading'), { once: true });
    heroBackground.addEventListener('error', () => hero.classList.remove('media-loading'), { once: true });
}

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
                    ['PT2 - M2U3 Midterms Lab Exercise 9', 'files/marina-pdf/performance-tasks/midterm/PT2%20-%20M2U3%20Midterms%20Lab%20Exercise%209.pdf'],
                    ['PT2 - M2U4 Midterms Lab Exercise 10', 'files/marina-pdf/performance-tasks/midterm/PT2%20-%20M2U4%20Midterms%20Lab%20Exercise%2010.pdf'],
                    ['PT2 - M3U1 Midterms Lab Exercise 11', 'files/marina-pdf/performance-tasks/midterm/PT2%20-%20M3U1%20Midterms%20Lab%20Exercise%2011.pdf'],
                    ['PT2 - M3U3 Midterms Lab Exercise 13', 'files/marina-pdf/performance-tasks/midterm/PT2%20-%20M3U3%20Midterms%20Lab%20Exercise%2013.pdf'],
                    ['PT2 - M3U3 Midterms Lab Exercise 14', 'files/marina-pdf/performance-tasks/midterm/PT2%20-%20M3U3%20Midterms%20Lab%20Exercise%2014.pdf']
                ]
            },
            chevelle: {
                prelim: [
                    ['PT1 - Laboratory Activity No. 1.2.1', 'files/chevelle-pdf/performance-tasks/prelim/PT1%20-%20LABORATORY%20ACTIVITY%20NO%201.2.1.pdf'],
                    ['PT1 - Laboratory Activity No. 1.2.2', 'files/chevelle-pdf/performance-tasks/prelim/PT1%20-%20LABORATORY%20ACTIVITY%20NO%201.2.2.pdf'],
                    ['PT1 - Laboratory Activity No. 1.3.3', 'files/chevelle-pdf/performance-tasks/prelim/PT1%20-%20LABORATORY%20ACTIVITY%20NO%201.3.3.pdf'],
                    ['PT1 - Laboratory Activity No. 1.4.4', 'files/chevelle-pdf/performance-tasks/prelim/PT1%20-%20LABORATORY%20ACTIVITY%20NO%201.4.4.pdf'],
                    ['PT1 - Laboratory Activity No. 1.4.5', 'files/chevelle-pdf/performance-tasks/prelim/PT1%20-%20LABORATORY%20ACTIVITY%20NO%201.4.5.pdf'],
                    ['PT1 - Laboratory Activity No. 1.5.6', 'files/chevelle-pdf/performance-tasks/prelim/PT1%20-%20LABORATORY%20ACTIVITY%20NO%201.5.6.pdf']
                ],
                midterm: [
                    ['PT2 - M2U3 Midterms Lab Exercise 8', 'files/chevelle-pdf/performance-tasks/midterm/PT2%20-%20M2U3%20Midterms%20Lab%20Exercise%208.pdf'],
                    ['PT2 - M2U3 Midterms Lab Exercise 9', 'files/chevelle-pdf/performance-tasks/midterm/PT2%20-%20M2U3%20Midterms%20Lab%20Exercise%209.pdf'],
                    ['PT2 - M3U1 Midterms Lab Exercise 11', 'files/chevelle-pdf/performance-tasks/midterm/PT2%20-%20M3U1%20Midterms%20Lab%20Exercise%2011.pdf']
                ]
            },
            sean: {
                prelim: [
                    ['PT1 - Laboratory Activity No. 1.2.1', 'files/sean-pdf/performance-tasks/prelim/PT1%20-%20LABORATORY%20ACTIVITY%20NO%201.2.1.pdf'],
                    ['PT1 - Laboratory Activity No. 1.2.2', 'files/sean-pdf/performance-tasks/prelim/PT1%20-%20LABORATORY%20ACTIVITY%20NO%201.2.2.pdf'],
                    ['PT1 - Laboratory Activity No. 1.3.3', 'files/sean-pdf/performance-tasks/prelim/PT1%20-%20LABORATORY%20ACTIVITY%20NO%201.3.3.pdf'],
                    ['PT1 - Laboratory Activity No. 1.4.4', 'files/sean-pdf/performance-tasks/prelim/PT1%20-%20LABORATORY%20ACTIVITY%20NO%201.4.4.pdf'],
                    ['PT1 - Laboratory Activity No. 1.4.5', 'files/sean-pdf/performance-tasks/prelim/PT1%20-%20LABORATORY%20ACTIVITY%20NO%201.4.5.pdf'],
                    ['PT1 - Laboratory Activity No. 1.5.6', 'files/sean-pdf/performance-tasks/prelim/PT1%20-%20LABORATORY%20ACTIVITY%20NO%201.5.6.pdf']
                ],
                midterm: [
                    ['PT2 - M2U3 Midterms Lab Exercise 8', 'files/sean-pdf/performance-tasks/midterm/PT2%20-%20M2U3%20Midterms%20Lab%20Exercise%208.pdf'],
                    ['PT2 - M2U3 Midterms Lab Exercise 9', 'files/sean-pdf/performance-tasks/midterm/PT2%20-%20M2U3%20Midterms%20Lab%20Exercise%209.pdf']
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
            },
            chevelle: {
                prelim: [
                    ['WW1-M1U1 Assignment 1', 'files/chevelle-pdf/assignments/prelim/WW1-M1U1%20Assignment%201.pdf'],
                    ['WW1 - M1U3 Prelims Assignment 2', 'files/chevelle-pdf/assignments/prelim/WW1%20-%20M1U3%20Prelims%20Assignment%202.pdf'],
                    ['WW1 - M1U4_U5 Prelims Assignment 3', 'files/chevelle-pdf/assignments/prelim/WW1%20-%20M1U4_U5%20Prelims%20Assignment%203.pdf'],
                    ['WW1 - M2U1_U2 Prelims Assignment 4', 'files/chevelle-pdf/assignments/prelim/WW1%20-%20M2U1_U2%20Prelims%20Assignment%204.pdf']
                ],
                midterm: [
                    ['WW2 - M2U3 Midterms Assignment 5', 'files/chevelle-pdf/assignments/midterm/WW2%20-%20M2U3%20Midterms%20Assignment%205.pdf'],
                    ['M2U4 Midterms Assignment 6', 'files/chevelle-pdf/assignments/midterm/M2U4%20Midterms%20Assignment%206.pdf'],
                    ['WW2 - M3U2 Midterms Assignment 8', 'files/chevelle-pdf/assignments/midterm/WW2%20%E2%80%93%20M3U2%20Midterms%20Assignment%208.pdf'],
                    ['WW2 - M3U3 Midterms Assignment 9', 'files/chevelle-pdf/assignments/midterm/WW2%20-%20M3U3%20Midterms%20Assignment%209.pdf'],
                    ['WW2 - M3U5_M4U1 Assignment 10', 'files/chevelle-pdf/assignments/midterm/WW2%20-%20M3U5_M4U1%20Assignment%2010.pdf']
                ]
            },
            sean: {
                prelim: [
                    ['WW1-M1U1 Assignment 1', 'files/sean-pdf/assignments/prelim/WW1-M1U1%20Assignment%201.pdf'],
                    ['WW1 - M1U3 Prelims Assignment 2', 'files/sean-pdf/assignments/prelim/WW1%20-%20M1U3%20Prelims%20Assignment%202.pdf'],
                    ['WW1 - M1U4_U5 Prelims Assignment 3', 'files/sean-pdf/assignments/prelim/WW1%20-%20M1U4_U5%20Prelims%20Assignment%203.pdf'],
                    ['WW1 - M2U1_U2 Prelims Assignment 4', 'files/sean-pdf/assignments/prelim/WW1%20-%20M2U1_U2%20Prelims%20Assignment%204.pdf']
                ],
                midterm: [
                    ['WW2 - M2U3 Midterms Assignment 5', 'files/sean-pdf/assignments/midterm/WW2%20-%20M2U3%20Midterms%20Assignment%205.pdf'],
                    ['M2U4 Midterms Assignment 6', 'files/sean-pdf/assignments/midterm/M2U4%20Midterms%20Assignment%206.pdf'],
                    ['WW2 - M3U2 Midterms Assignment 8', 'files/sean-pdf/assignments/midterm/WW2%20%E2%80%93%20M3U2%20Midterms%20Assignment%208.pdf'],
                    ['WW2 - M3U3 Midterms Assignment 9', 'files/sean-pdf/assignments/midterm/WW2%20-%20M3U3%20Midterms%20Assignment%209.pdf'],
                    ['WW2 - M3U5_M4U1 Assignment 10', 'files/sean-pdf/assignments/midterm/WW2%20-%20M3U5_M4U1%20Assignment%2010.pdf']
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
    resourceCategory.textContent = `${currentTerm === 'prelim' ? 'Prelim' : 'Midterm'} ${group.label}`;
    resourceDescription.textContent = `Select a member to view their ${currentTerm === 'prelim' ? 'Prelim' : 'Midterm'} ${group.label.toLowerCase()}.`;
    resourceList.innerHTML = files.length ? files.map(([, href]) => {
        const fileName = getFileName(href);
        return `
        <a class="file-item file-open" href="${href}" aria-label="Open ${fileName}"><span>${fileName}</span></a>
    `;
    }).join('') : '<p class="modal__empty">No files have been submitted for this member yet.</p>';
    setupMediaLoading(resourceList);
};

const setModal = (isOpen) => {
    resourceModal.classList.toggle('is-open', isOpen);
    resourceModal.setAttribute('aria-hidden', String(!isOpen));
    document.body.classList.toggle('modal-open', isOpen);
    if (isOpen) {
        resetMemberSelection();
        renderResources();
    }
};

document.addEventListener('click', (event) => {
    const pdfLink = event.target.closest('a[href*=".pdf"]');
    if (pdfLink && !pdfLink.closest('.resource-modal')) {
        event.preventDefault();
        event.stopPropagation();
        return;
    }

    const trigger = event.target.closest('[data-resource]');
    if (trigger) {
        event.preventDefault();
        event.stopPropagation();
        currentResource = trigger.dataset.resource;
        currentTerm = trigger.dataset.term;
        setModal(true);
        return;
    }

    const memberButton = event.target.closest('.member-selector__button');
    if (memberButton && memberButton.closest('.resource-modal')) {
        currentMember = memberButton.dataset.member;
        document.querySelectorAll('.resource-modal .member-selector__button').forEach((button) => {
            button.classList.toggle('is-selected', button === memberButton);
        });
        renderResources();
        setResourceView('files');
        resourceSelectLabel.textContent = memberButton.textContent.trim().split(/\s+/)[0];
        return;
    }

    if (event.target.closest('.resource-modal__return')) {
        resetMemberSelection();
        return;
    }

    const fileButton = event.target.closest('.file-open');
    if (fileButton) {
        if (!fileButton.closest('.resource-modal')) {
            event.preventDefault();
        }
        return;
    }

    if (event.target.closest('.modal__close') || event.target === resourceModal) setModal(false);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (resourceModal.classList.contains('is-open')) setModal(false);
    }
});
