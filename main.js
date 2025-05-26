// script.js
document.addEventListener("DOMContentLoaded", function () {
    // User profile dropdown
    const userProfile = document.getElementById("userProfile");
    const userDropdown = document.getElementById("userDropdown");
    const switchAccount = document.getElementById("switchAccount");

    if (userProfile && userDropdown) {
        userProfile.addEventListener("click", (e) => {
            e.stopPropagation();
            userDropdown.style.display = userDropdown.style.display === "block" ? "none" : "block";
        });

        window.addEventListener("click", () => userDropdown.style.display = "none");
    }

    if (switchAccount) {
        switchAccount.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "login.html";
        });
    }

    // Set email from storage
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser && document.getElementById("username-display")) {
        document.getElementById("username-display").textContent = storedUser;
    }

    const rightPanel = document.querySelector('.right-panel');
    const closePanelBtn = document.querySelector('.close-panel');
    const createNetworkBtn = document.querySelector('.btn-primary');
    const modal = document.getElementById('createNetworkModal');
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    const networkItems = document.querySelectorAll('.network-item');
    const activityItems = document.querySelectorAll('.activity-item');
    const editorTabs = document.querySelectorAll('.editor-tab');
    const fileTabs = document.querySelectorAll('.file-tab');
    const fileTabAdd = document.querySelector('.file-tab-add');
    const sidebarMenuItems = document.querySelectorAll('.sidebar-menu li');
    const btnHelp = document.querySelector('.btn-help');
    const btnNotifications = document.querySelector('.btn-notifications');
    const searchInput = document.querySelector('.search-container input');

    if (rightPanel && closePanelBtn) {
        closePanelBtn.addEventListener('click', () => rightPanel.classList.toggle('hidden'));
    }

    if (createNetworkBtn && modal) {
        createNetworkBtn.addEventListener('click', () => modal.classList.add('active'));
    }

    if (modal) {
        modalCloseBtns.forEach(btn => btn.addEventListener('click', () => modal.classList.remove('active')));
        modal.addEventListener('click', (e) => e.target === modal && modal.classList.remove('active'));
    }

    if (networkItems) {
        networkItems.forEach(item => {
            item.addEventListener('click', function(e) {
                if (e.target.classList.contains('btn-action')) return;
                const networkName = this.querySelector('h4').textContent;
                const networkVersion = this.querySelector('p').textContent.split(': ')[1];
                
                document.querySelector('.property-value:nth-of-type(1)').textContent = networkName;
                document.querySelector('.property-value:nth-of-type(2)').textContent = networkVersion;
                rightPanel?.classList.remove('hidden');
            });
        });
    }

    activityItems?.forEach(item => item.addEventListener('click', () => 
        console.log('Activity selected:', item.querySelector('p').textContent)));

    editorTabs?.forEach(tab => tab.addEventListener('click', function() {
        editorTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        console.log('Switched to tab:', this.textContent);
    }));

    fileTabs?.forEach(tab => {
        tab.addEventListener('click', function(e) {
            if (e.target.classList.contains('close-tab')) return;
            fileTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            console.log('Switched to file:', this.textContent.trim());
        });

        const closeBtn = tab.querySelector('.close-tab');
        closeBtn?.addEventListener('click', function(e) {
            e.stopPropagation();
            tab.remove();
            if (tab.classList.contains('active')) {
                const remainingTabs = document.querySelectorAll('.file-tab');
                remainingTabs[0]?.classList.add('active');
            }
        });                         
    });

    fileTabAdd?.addEventListener('click', function() {
        const newTab = document.createElement('div');
        newTab.className = 'file-tab';
        newTab.innerHTML = `New File <span class="close-tab">×</span>`;
        fileTabAdd.parentNode.insertBefore(newTab, fileTabAdd);
        
        newTab.addEventListener('click', function(e) {
            if (e.target.classList.contains('close-tab')) return;
            fileTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
        
        newTab.querySelector('.close-tab').addEventListener('click', (e) => {
            e.stopPropagation();
            newTab.remove();
        });
    });

    sidebarMenuItems?.forEach(item => item.addEventListener('click', function() {
        sidebarMenuItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        console.log('Navigated to:', this.querySelector('a').textContent.trim());
    }));

    btnHelp?.addEventListener('click', () => alert('Help documentation would open here.'));
    btnNotifications?.addEventListener('click', () => console.log('Notifications button clicked'));

    searchInput?.addEventListener('keyup', (e) => e.key === 'Enter' && console.log('Searching for:', e.target.value));

    const createNetworkForm = document.querySelector('.modal-footer .btn-primary');
    createNetworkForm?.addEventListener('click', function(e) {
        e.preventDefault();
        const networkName = document.getElementById('networkName').value;
        const networkVersion = document.getElementById('networkVersion').value;
        
        if (!networkName || !networkVersion) {
            alert('Please fill in all required fields.');
            return;
        }
        
        console.log('Creating network:', {
            name: networkName,
            description: document.getElementById('networkDescription').value,
            version: networkVersion,
            template: document.getElementById('networkTemplate').value,
            initializeWithSample: document.getElementById('initializeWithSample').checked
        });
        
        modal?.classList.remove('active');
        alert(`Network "${networkName}" created successfully!`);
    });

    document.querySelectorAll('.network-actions .btn-action').forEach(action => {
        action.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const networkName = this.closest('.network-item').querySelector('h4').textContent;
            
            if (icon.classList.contains('fa-play')) {
                alert(`Starting network: ${networkName}`);
            } else if (icon.classList.contains('fa-edit')) {
                console.log(`Editing network: ${networkName}`);
            } else if (icon.classList.contains('fa-trash') && confirm(`Delete ${networkName}?`)) {
                this.closest('.network-item').remove();
            }
        });
    });

    document.querySelectorAll('.control-card .btn').forEach(button => 
        button.addEventListener('click', () => 
            alert(`${button.textContent.trim()} action would be performed here.`)));

    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        const views = {
            'Dashboard': showDashboardView,
            'Business Networks': showBusinessNetworksView,
            'Model Files': showModelFilesView,
            'Script Files': showScriptFilesView,
            'Access Control': showAccessControlView,
            'Query Files': showQueryFilesView,
            'Transaction History': showTransactionHistoryView,
            'Settings': showSettingsView
        };

        sidebarMenuItems?.forEach(item => item.addEventListener('click', function(e) {
            e.preventDefault();
            sidebarMenuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            const view = views[this.querySelector('a').textContent.trim()];
            view?.();
        }));
    }

    function showDashboardView() {
        mainContent.innerHTML = `<header class="top-header"></header>
            <div class="dashboard-container"></div>
            <footer class="main-footer"></footer>`;
    }

    function showBusinessNetworksView() {
        mainContent.innerHTML = `<header class="top-header"></header>
            <div class="business-networks-container"></div>
            <footer class="main-footer"></footer>`;
    }

    function showModelFilesView() { mainContent.innerHTML = ''; }
    function showScriptFilesView() { mainContent.innerHTML = ''; }
    function showAccessControlView() { mainContent.innerHTML = ''; }
    function showQueryFilesView() { mainContent.innerHTML = ''; }
    function showTransactionHistoryView() { mainContent.innerHTML = ''; }
    function showSettingsView() { mainContent.innerHTML = ''; }
});

// Login and Signup form handling
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const isLogin = window.location.pathname.includes("login.html");
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;
        const endpoint = isLogin ? "/login" : "/signup";

        try {
            const response = await fetch(`http://localhost:3000${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) throw new Error(await response.text());

            const result = await response.json();
            localStorage.setItem("loggedInUser", result.email);

            alert(`${isLogin ? "Login" : "Signup"} successful! Welcome, ${result.email}`);
            window.location.href = "index.html";
        } catch (error) {
            alert(`${isLogin ? "Login" : "Signup"} failed:` + error.message);
        }
    });
});
