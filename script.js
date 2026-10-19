// Projects Data
const initialProjects = [
    {
        id: 'proj-1',
        title: 'DEPI Data Analytics Dashboard',
        category: 'data',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        tech: ['Python', 'Pandas', 'SQL', 'Data Analytics'],
        description: 'Data analytics platform designed for the Digital Egypt Pioneers Initiative (DEPI). Processes complex datasets, extracts key metrics, and visualizes analytical insights.',
        link: '#'
    },
    {
        id: 'proj-2',
        title: 'Interactive Web Portal',
        category: 'web',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        tech: ['HTML5', 'Tailwind CSS', 'JavaScript', 'UI/UX'],
        description: 'Modern, ultra-responsive website featuring fluid animations, theme switcher, interactive sections, and clean modern aesthetics.',
        link: '#'
    },
    {
        id: 'proj-3',
        title: 'C++ & SQL Database Management System',
        category: 'sql',
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
        tech: ['C++', 'SQL', 'Database Architecture'],
        description: 'Robust backend relational management system implementing custom SQL queries, dataset joins, indexing, and object-oriented C++ business logic.',
        link: '#'
    }
];

// EXACT 3 CERTIFICATES DATA
const certificatesData = [
    {
        id: 'cert-1',
        title: 'DECI Level 2',
        issuer: 'Digital Egypt Cubs Initiative (DECI)',
        image: 'assets/1st.png',
        date: '2023',
        description: 'Core IT & Programming Fundamentals: Covers computational thinking, algorithmic problem solving, binary logic, and foundational programming architectures.'
    },
    {
        id: 'cert-2',
        title: 'DECI Level 3 - Web Development Track',
        issuer: 'Digital Egypt Cubs Initiative (DECI)',
        image: 'assets/2nd.png',
        date: '2024',
        description: 'Advanced HTML, CSS, JavaScript & Responsive Web Design: Hands-on training in building interactive, cross-device web application user interfaces.'
    },
    {
        id: 'cert-3',
        title: 'GDG - Web Development Track',
        issuer: 'Google Developer Groups (GDG)',
        image: 'assets/3rd.png',
        date: '2026',
        description: 'Modern Web Technologies, Frontend Development & Interactive Applications: Intensive technical track focusing on modern DOM workflows, modern web tools, and performant web interfaces.'
    }
];

// Technical Skills
const skillsData = [
    { name: 'HTML5', level: 99, icon: 'fa-brands fa-html5', color: 'text-orange-500' },
    { name: 'JavaScript ES6+', level: 80, icon: 'fa-brands fa-js', color: 'text-yellow-400' },
    { name: 'CSS3', level: 97, icon: 'fa-brands fa-css3-alt', color: 'text-cyan-400' },
    { name: 'C++ Systems & OOP', level: 77, icon: 'fa-solid fa-code', color: 'text-blue-400' },
    { name: 'SQL & Database Design', level: 80, icon: 'fa-solid fa-database', color: 'text-purple-400' },
    { name: 'Python & Data Science', level: 72, icon: 'fa-brands fa-python', color: 'text-emerald-400' },
    { name: 'Canva Design', level: 99, icon: 'fa-solid fa-pen-nib', color: 'text-pink-400' },
    { name: 'Adobe Photoshop', level: 87, icon: 'fa-solid fa-image', color: 'text-indigo-400' },
    { name: 'UI/UX', level: 82, icon: 'fa-solid fa-layer-group', color: 'text-amber-400' },
];

// Persistent App State
let projects = JSON.parse(localStorage.getItem('moheb_portfolio_projects')) || initialProjects;

// Ensure everything executes safely when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    renderProjects('all');
    renderCertificates();
    renderSkills();
});

// SPA Navigation View Manager
function switchView(viewName, projectId = null) {
    const mainView = document.getElementById('mainView');
    const detailView = document.getElementById('projectDetailView');

    if (viewName === 'detail' && projectId) {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            renderProjectDetail(project);
            mainView.classList.remove('active');
            detailView.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } else {
        detailView.classList.remove('active');
        mainView.classList.add('active');
    }
}

function navigateToSection(sectionId) {
    switchView('main');
    setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
}

// Render Projects Grid
function renderProjects(filterCategory = 'all') {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = filterCategory === 'all' 
        ? projects 
        : projects.filter(p => p.category === filterCategory);

    if (filtered.length === 0) {
        grid.innerHTML = `<p class="col-span-full text-center text-slate-500 py-12 font-mono">No projects found in this category.</p>`;
        return;
    }

    filtered.forEach(project => {
        const techBadges = project.tech.map(t => `<span class="px-2 py-0.5 rounded-lg text-[10px] font-mono glass-panel border border-cyan-500/30 text-cyan-400">${t}</span>`).join(' ');

        const cardHtml = `
            <div class="glass-panel rounded-3xl overflow-hidden card-tilt flex flex-col justify-between group border border-slate-800">
                <div>
                    <div class="relative h-52 overflow-hidden">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.src='https://placehold.co/800x450/0f172a/06b6d4?text=Project+Image'">
                        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                        <div class="absolute top-3 right-3 flex space-x-2">
                            <button onclick="event.stopPropagation(); openProjectModal('${project.id}')" class="p-2 rounded-xl glass-panel text-xs text-amber-400 hover:bg-amber-500/20" title="Edit Project">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button onclick="event.stopPropagation(); deleteProject('${project.id}')" class="p-2 rounded-xl glass-panel text-xs text-rose-400 hover:bg-rose-500/20" title="Delete Project">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="p-6 space-y-3">
                        <div class="flex flex-wrap gap-1.5">${techBadges}</div>
                        <h3 class="font-display font-bold text-lg group-hover:text-cyan-400 transition-colors">${project.title}</h3>
                        <p class="text-xs text-slate-400 line-clamp-2 font-light">${project.description}</p>
                    </div>
                </div>
                <div class="px-6 pb-6 pt-2">
                    <button onclick="switchView('detail', '${project.id}')" class="w-full py-2.5 rounded-2xl glass-panel border border-cyan-500/40 text-xs font-semibold hover:border-cyan-400 transition-all flex items-center justify-center space-x-2">
                        <span>View Full Project Details</span>
                        <i class="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                </div>
            </div>
        `;
        grid.innerHTML += cardHtml;
    });
}

// Render Single Project Detail Page
function renderProjectDetail(project) {
    const container = document.getElementById('projectDetailContent');
    if (!container) return;
    const techBadges = project.tech.map(t => `<span class="px-3.5 py-1.5 rounded-xl font-mono text-xs glass-panel border border-cyan-500/40 text-cyan-400">${t}</span>`).join(' ');

    container.innerHTML = `
        <div class="relative h-72 sm:h-96 rounded-2xl overflow-hidden">
            <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/800x450/0f172a/06b6d4?text=Project+Detail'">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            <div class="absolute bottom-6 left-6 right-6">
                <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">${project.category.toUpperCase()} PROJECT</span>
                <h1 class="font-display text-2xl sm:text-4xl font-extrabold">${project.title}</h1>
            </div>
        </div>

        <div class="space-y-6">
            <div>
                <h3 class="font-mono text-xs text-slate-400 mb-3">TECHNOLOGIES & TOOLS</h3>
                <div class="flex flex-wrap gap-2">${techBadges}</div>
            </div>

            <div>
                <h3 class="font-mono text-xs text-slate-400 mb-2">PROJECT DESCRIPTION & OVERVIEW</h3>
                <p class="text-slate-300 leading-relaxed text-sm sm:text-base font-light">${project.description}</p>
            </div>

            <div class="p-6 rounded-2xl glass-panel space-y-3 border border-slate-800">
                <h4 class="font-bold text-sm text-cyan-400">Key Features & Highlights:</h4>
                <ul class="list-disc list-inside text-xs sm:text-sm text-slate-300 space-y-1.5 font-light">
                    <li>Fully responsive front-end layout optimized for desktop, tablet, and mobile views.</li>
                    <li>Integrated into Moheb Maher Morkos' personal portfolio ecosystem.</li>
                    <li>Dynamic content persistent via local application state.</li>
                </ul>
            </div>

            <div class="flex flex-wrap gap-4 pt-4 border-t border-slate-800">
                <a href="${project.link || '#'}" target="_blank" class="btn-gradient px-7 py-3.5 rounded-2xl font-semibold text-xs flex items-center space-x-2">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    <span>Live Demo / Source Code</span>
                </a>
                <button onclick="openProjectModal('${project.id}')" class="px-7 py-3.5 rounded-2xl glass-panel border border-amber-500/40 text-amber-400 font-semibold text-xs flex items-center space-x-2 hover:bg-amber-500/10 transition-colors">
                    <i class="fa-solid fa-pen"></i>
                    <span>Edit Project Info</span>
                </button>
            </div>
        </div>
    `;
}

// Render Certificates Grid
function renderCertificates() {
    const grid = document.getElementById('certificatesGrid');
    if (!grid) return;
    grid.innerHTML = '';

    certificatesData.forEach(cert => {
        const cardHtml = `
            <div class="glass-panel p-5 rounded-3xl card-tilt flex flex-col justify-between cursor-pointer border border-slate-800" onclick="openCertModal('${cert.image}', '${cert.title}', '${cert.issuer}', '${cert.description}')">
                <div>
                    <div class="relative h-44 rounded-2xl overflow-hidden mb-4">
                        <img src="${cert.image}" alt="${cert.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
                    </div>
                    <span class="text-[10px] font-mono text-cyan-400 block">${cert.date}</span>
                    <h3 class="font-bold text-base mt-1 text-slate-100">${cert.title}</h3>
                    <p class="text-xs text-slate-400 mt-1 font-light">${cert.issuer}</p>
                    <p class="text-xs text-slate-300 mt-2 font-light line-clamp-2">${cert.description}</p>
                </div>
                <div class="mt-4 pt-3 border-t border-slate-800/80 flex justify-between items-center text-xs font-mono text-cyan-400">
                    <span>Inspect Credential</span>
                    <i class="fa-solid fa-expand"></i>
                </div>
            </div>
        `;
        grid.innerHTML += cardHtml;
    });
}

// Render Technical Skills with Bar Animation
function renderSkills() {
    const container = document.getElementById('skillsContainer');
    if (!container) return;
    container.innerHTML = '';

    skillsData.forEach(skill => {
        const html = `
            <div class="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-3">
                        <div class="text-xl ${skill.color}">
                            <i class="${skill.icon}"></i>
                        </div>
                        <span class="font-bold text-sm">${skill.name}</span>
                    </div>
                    <span class="font-mono text-xs text-cyan-400">${skill.level}%</span>
                </div>
                <div class="w-full h-2 rounded-full overflow-hidden" style="background: var(--skill-bar-bg);">
                    <div class="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 skill-progress-bar" style="width: ${skill.level}%;"></div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

// Filter Projects
function filterProjects(cat) {
    document.querySelectorAll('.project-filter-btn').forEach(btn => {
        btn.classList.remove('border-cyan-500', 'text-cyan-400');
    });
    if (event && event.target) {
        event.target.classList.add('border-cyan-500', 'text-cyan-400');
    }
    renderProjects(cat);
}

// Modal Controls (Added explicit safety checks)
function openProjectModal(projectId = null) {
    const modal = document.getElementById('projectModal');
    const form = document.getElementById('projectForm');
    const modalTitle = document.getElementById('modalTitle');
    if (!modal || !form) return;

    if (projectId) {
        const p = projects.find(item => item.id === projectId);
        if (p) {
            modalTitle.innerText = 'Edit Project';
            document.getElementById('projectId').value = p.id;
            document.getElementById('projectTitleInput').value = p.title;
            document.getElementById('projectCategoryInput').value = p.category;
            document.getElementById('projectImageInput').value = p.image;
            document.getElementById('projectTechInput').value = p.tech.join(', ');
            document.getElementById('projectDescInput').value = p.description;
            document.getElementById('projectLinkInput').value = p.link || '';
        }
    } else {
        modalTitle.innerText = 'Add New Project';
        form.reset();
        document.getElementById('projectId').value = '';
    }

    modal.classList.remove('hidden');
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) modal.classList.add('hidden');
}

function saveProject(e) {
    e.preventDefault();
    const id = document.getElementById('projectId').value;
    const title = document.getElementById('projectTitleInput').value;
    const category = document.getElementById('projectCategoryInput').value;
    const image = document.getElementById('projectImageInput').value || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
    const tech = document.getElementById('projectTechInput').value.split(',').map(t => t.trim()).filter(t => t.length > 0);
    const description = document.getElementById('projectDescInput').value;
    const link = document.getElementById('projectLinkInput').value;

    if (id) {
        const index = projects.findIndex(p => p.id === id);
        if (index !== -1) {
            projects[index] = { id, title, category, image, tech, description, link };
            showToast('Project updated successfully!');
        }
    } else {
        const newProj = {
            id: 'proj-' + Date.now(),
            title, category, image, tech, description, link
        };
        projects.unshift(newProj);
        showToast('New project created successfully!');
    }

    localStorage.setItem('moheb_portfolio_projects', JSON.stringify(projects));
    renderProjects('all');
    closeProjectModal();

    if (id && document.getElementById('projectDetailView').classList.contains('active')) {
        switchView('detail', id);
    }
}

function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        projects = projects.filter(p => p.id !== id);
        localStorage.setItem('moheb_portfolio_projects', JSON.stringify(projects));
        renderProjects('all');
        showToast('Project removed.');
    }
}

// Certificate Lightbox Modals
function openCertModal(image, title, issuer, desc) {
    document.getElementById('certModalImg').src = image;
    document.getElementById('certModalTitle').innerText = title;
    document.getElementById('certModalIssuer').innerText = issuer;
    document.getElementById('certModalDesc').innerText = desc || '';
    document.getElementById('certModal').classList.remove('hidden');
}

function closeCertModal() {
    document.getElementById('certModal').classList.add('hidden');
}

// Theme Switcher Logic
function toggleThemeMenu() {
    document.getElementById('themeMenu').classList.toggle('hidden');
}

function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    document.getElementById('themeMenu').classList.add('hidden');
    
    const labelMap = {
        'cyberpunk': 'Cyberpunk',
        'clean-light': 'Clean Light',
        'sunset-warm': 'Sunset Warm'
    };
    document.getElementById('currentThemeLabel').innerText = labelMap[themeName];
    showToast(`Theme switched to ${labelMap[themeName]}`);
}

// Mobile Nav Toggle
function toggleMobileMenu() {
    document.getElementById('mobileMenu').classList.toggle('hidden');
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    document.getElementById('toastMessage').innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Form Handler
function handleContactSubmit(e) {
    e.preventDefault();
    showToast('Thank you! Your message has been sent to Moheb Maher.');
    e.target.reset();
}