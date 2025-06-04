// script.js
document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
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
    const userProfile = document.querySelector('.user-profile');
    const sidebarMenuItems = document.querySelectorAll('.sidebar-menu li');
    const btnHelp = document.querySelector('.btn-help');
    const btnNotifications = document.querySelector('.btn-notifications');
    const searchInput = document.querySelector('.search-container input');

    // Toggle right panel
    closePanelBtn.addEventListener('click', function () {
        rightPanel.classList.toggle('hidden');
    });

    // Show create network modal
    createNetworkBtn.addEventListener('click', function () {
        modal.classList.add('active');
    });

    // Close modal
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            modal.classList.remove('active');
        });
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Network item click handler
    networkItems.forEach(item => {
        item.addEventListener('click', function (e) {
            if (e.target.classList.contains('btn-action')) return;

            // Update right panel with network details
            const networkName = this.querySelector('h4').textContent;
            const networkVersion = this.querySelector('p').textContent.split(': ')[1];

            document.querySelector('.property-value:nth-of-type(1)').textContent = networkName;
            document.querySelector('.property-value:nth-of-type(2)').textContent = networkVersion;

            // Show right panel if hidden
            rightPanel.classList.remove('hidden');
        });
    });

    // Activity item click handler
    activityItems.forEach(item => {
        item.addEventListener('click', function () {
            // In a real app, this would show more details about the activity
            console.log('Activity selected:', this.querySelector('p').textContent);
        });
    });

    // Editor tab switching
    editorTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            editorTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // In a real app, this would switch the editor content
            console.log('Switched to tab:', this.textContent);
        });
    });

    // File tab switching
    fileTabs.forEach(tab => {
        tab.addEventListener('click', function (e) {
            if (e.target.classList.contains('close-tab')) return;

            fileTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // In a real app, this would switch the editor content
            console.log('Switched to file:', this.textContent.trim());
        });
    });

    // Close file tab
    fileTabs.forEach(tab => {
        const closeBtn = tab.querySelector('.close-tab');
        if (closeBtn) {
            closeBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                tab.remove();

                // If this was the active tab, activate the first remaining tab
                if (tab.classList.contains('active')) {
                    const remainingTabs = document.querySelectorAll('.file-tab');
                    if (remainingTabs.length > 0) {
                        remainingTabs[0].classList.add('active');
                    }
                }
            });
        }
    });

    // Add new file tab
    fileTabAdd.addEventListener('click', function () {
        const newTab = document.createElement('div');
        newTab.className = 'file-tab';
        newTab.innerHTML = `New File <span class="close-tab">×</span>`;

        fileTabAdd.parentNode.insertBefore(newTab, fileTabAdd);

        // Add event listeners to the new tab
        newTab.addEventListener('click', function (e) {
            if (e.target.classList.contains('close-tab')) return;

            fileTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });

        const closeBtn = newTab.querySelector('.close-tab');
        closeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            newTab.remove();
        });
    });

    // User profile dropdown (simplified)
    userProfile.addEventListener('click', function () {
        // In a real app, this would show a dropdown menu
        console.log('User profile clicked');
    });

    // Sidebar menu navigation
    sidebarMenuItems.forEach(item => {
        item.addEventListener('click', function () {
            sidebarMenuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // In a real app, this would load the appropriate content
            console.log('Navigated to:', this.querySelector('a').textContent.trim());
        });
    });

    // Help button
    btnHelp.addEventListener('click', function () {
        // In a real app, this would open help documentation
        console.log('Help button clicked');
        alert('Help documentation would open here.');
    });

    // Notifications button
    btnNotifications.addEventListener('click', function () {
        // In a real app, this would show notifications
        console.log('Notifications button clicked');
    });

    // Search functionality
    searchInput.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            // In a real app, this would perform a search
            console.log('Searching for:', this.value);
        }
    });

    // Form submission for creating a new network
    const createNetworkForm = document.querySelector('.modal-footer .btn-primary');
    createNetworkForm.addEventListener('click', function (e) {
        e.preventDefault();

        const networkName = document.getElementById('networkName').value;
        const networkDescription = document.getElementById('networkDescription').value;
        const networkVersion = document.getElementById('networkVersion').value;
        const networkTemplate = document.getElementById('networkTemplate').value;
        const initializeWithSample = document.getElementById('initializeWithSample').checked;

        if (!networkName || !networkVersion) {
            alert('Please fill in all required fields.');
            return;
        }

        // In a real app, this would create the network
        console.log('Creating network:', {
            name: networkName,
            description: networkDescription,
            version: networkVersion,
            template: networkTemplate,
            initializeWithSample: initializeWithSample
        });

        // Close the modal
        modal.classList.remove('active');

        // Show success message
        alert(`Network "${networkName}" created successfully!`);
    });

    // Simulate network actions
    const networkActions = document.querySelectorAll('.network-actions .btn-action');
    networkActions.forEach(action => {
        action.addEventListener('click', function () {
            const icon = this.querySelector('i');
            const networkName = this.closest('.network-item').querySelector('h4').textContent;

            if (icon.classList.contains('fa-play')) {
                console.log(`Starting network: ${networkName}`);
                alert(`Starting network: ${networkName}`);
            } else if (icon.classList.contains('fa-edit')) {
                console.log(`Editing network: ${networkName}`);
            } else if (icon.classList.contains('fa-trash')) {
                if (confirm(`Are you sure you want to delete ${networkName}?`)) {
                    console.log(`Deleting network: ${networkName}`);
                    this.closest('.network-item').remove();
                }
            }
        });
    });

    // Control card buttons
    const controlCardButtons = document.querySelectorAll('.control-card .btn');
    controlCardButtons.forEach(button => {
        button.addEventListener('click', function () {
            const action = this.textContent.trim();
            console.log(`Control action: ${action}`);
            alert(`${action} action would be performed here.`);
        });
    });
});

// Add this to your existing script.js file, focusing just on sidebar functionality

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const sidebarMenuItems = document.querySelectorAll('.sidebar-menu li');
    const mainContent = document.querySelector('.main-content');
    const dashboardContainer = document.querySelector('.dashboard-container');

    // Hyperledger Composer sidebar functionality
    function setupSidebarMenu() {
        sidebarMenuItems.forEach(item => {
            item.addEventListener('click', function (e) {
                e.preventDefault();

                // Remove active class from all items
                sidebarMenuItems.forEach(i => i.classList.remove('active'));

                // Add active class to clicked item
                this.classList.add('active');

                // Get the menu item text
                const menuText = this.querySelector('a').textContent.trim();

                // Handle each menu item
                switch (menuText) {
                    case 'Dashboard':
                        showDashboardView();
                        break;
                    case 'Business Networks':
                        showBusinessNetworksView();
                        break;
                    case 'Model Files':
                        showModelFilesView();
                        break;
                    case 'Script Files':
                        showScriptFilesView();
                        break;
                    case 'Access Control':
                        showAccessControlView();
                        break;
                    case 'Query Files':
                        showQueryFilesView();
                        break;
                    case 'Transaction History':
                        showTransactionHistoryView();
                        break;
                    case 'Settings':
                        showSettingsView();
                        break;
                }
            });
        });
    }

    // View functions for each menu item
    function showDashboardView() {
        mainContent.innerHTML = `
            <header class="top-header">
                <!-- Header content from your original HTML -->
            </header>
            <div class="dashboard-container">
                <!-- Dashboard content from your original HTML -->
            </div>
            <footer class="main-footer">
                <!-- Footer content from your original HTML -->
            </footer>
        `;
        // Reinitialize dashboard functionality
        initDashboard();
    }

    function showBusinessNetworksView() {
        mainContent.innerHTML = `
            <header class="top-header">
                <div class="breadcrumb">
                    <a href="#">Home</a> / <a href="#">Business Networks</a>
                </div>
                <!-- Rest of header -->
            </header>
            <div class="business-networks-container">
                <div class="section-header">
                    <h2>Business Networks</h2>
                    <div class="btn-group">
                        <button class="btn btn-primary" id="createNetworkBtn"><i class="fas fa-plus"></i> Create Network</button>
                        <button class="btn btn-secondary"><i class="fas fa-upload"></i> Import</button>
                    </div>
                </div>
                <div class="networks-list">
                    <!-- Networks will be loaded here -->
                </div>
            </div>
            <footer class="main-footer">
                <!-- Footer content -->
            </footer>
        `;

        // Load networks
        loadBusinessNetworks();

        // Add event listeners
        document.getElementById('createNetworkBtn').addEventListener('click', showCreateNetworkModal);
    }

    function showModelFilesView() {
        mainContent.innerHTML = `
            <header class="top-header">
                <div class="breadcrumb">
                    <a href="#">Home</a> / <a href="#">Model Files</a>
                </div>
                <!-- Rest of header -->
            </header>
            <div class="model-files-container">
                <div class="section-header">
                    <h2>Model Files</h2>
                    <div class="btn-group">
                        <button class="btn btn-primary"><i class="fas fa-plus"></i> New Model</button>
                    </div>
                </div>
                <div class="editor-container">
                    <!-- Model editor content -->
                </div>
            </div>
            <footer class="main-footer">
                <!-- Footer content -->
            </footer>
        `;

        // Initialize model editor
        initModelEditor();
    }

    function showScriptFilesView() {
        mainContent.innerHTML = `
            <header class="top-header">
                <div class="breadcrumb">
                    <a href="#">Home</a> / <a href="#">Script Files</a>
                </div>
                <!-- Rest of header -->
            </header>
            <div class="script-files-container">
                <div class="section-header">
                    <h2>Transaction Processor Functions</h2>
                    <div class="btn-group">
                        <button class="btn btn-primary"><i class="fas fa-plus"></i> New Script</button>
                    </div>
                </div>
                <div class="editor-container">
                    <!-- Script editor content -->
                </div>
            </div>
            <footer class="main-footer">
                <!-- Footer content -->
            </footer>
        `;

        // Initialize script editor
        initScriptEditor();
    }

    function showAccessControlView() {
        mainContent.innerHTML = `
            <header class="top-header">
                <div class="breadcrumb">
                    <a href="#">Home</a> / <a href="#">Access Control</a>
                </div>
                <!-- Rest of header -->
            </header>
            <div class="access-control-container">
                <div class="section-header">
                    <h2>Access Control Rules</h2>
                    <div class="btn-group">
                        <button class="btn btn-primary"><i class="fas fa-plus"></i> New Rule</button>
                    </div>
                </div>
                <div class="editor-container">
                    <!-- ACL editor content -->
                </div>
            </div>
            <footer class="main-footer">
                <!-- Footer content -->
            </footer>
        `;

        // Initialize ACL editor
        initACLEditor();
    }

    function showQueryFilesView() {
        mainContent.innerHTML = `
            <header class="top-header">
                <div class="breadcrumb">
                    <a href="#">Home</a> / <a href="#">Query Files</a>
                </div>
                <!-- Rest of header -->
            </header>
            <div class="query-files-container">
                <div class="section-header">
                    <h2>Queries</h2>
                    <div class="btn-group">
                        <button class="btn btn-primary"><i class="fas fa-plus"></i> New Query</button>
                    </div>
                </div>
                <div class="editor-container">
                    <!-- Query editor content -->
                </div>
            </div>
            <footer class="main-footer">
                <!-- Footer content -->
            </footer>
        `;

        // Initialize query editor
        initQueryEditor();
    }

    function showTransactionHistoryView() {
        mainContent.innerHTML = `
            <header class="top-header">
                <div class="breadcrumb">
                    <a href="#">Home</a> / <a href="#">Transaction History</a>
                </div>
                <!-- Rest of header -->
            </header>
            <div class="transaction-history-container">
                <div class="section-header">
                    <h2>Transaction History</h2>
                    <div class="btn-group">
                        <button class="btn btn-secondary"><i class="fas fa-filter"></i> Filter</button>
                        <button class="btn btn-secondary"><i class="fas fa-download"></i> Export</button>
                    </div>
                </div>
                <div class="transactions-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Type</th>
                                <th>Participant</th>
                                <th>Timestamp</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Transactions will be loaded here -->
                        </tbody>
                    </table>
                </div>
            </div>
            <footer class="main-footer">
                <!-- Footer content -->
            </footer>
        `;

        // Load transaction history
        loadTransactionHistory();
    }

    function showSettingsView() {
        mainContent.innerHTML = `
            <header class="top-header">
                <div class="breadcrumb">
                    <a href="#">Home</a> / <a href="#">Settings</a>
                </div>
                <!-- Rest of header -->
            </header>
            <div class="settings-container">
                <div class="section-header">
                    <h2>Settings</h2>
                </div>
                <div class="settings-tabs">
                    <div class="settings-tab active" data-tab="general">General</div>
                    <div class="settings-tab" data-tab="connection">Connection</div>
                    <div class="settings-tab" data-tab="security">Security</div>
                </div>
                <div class="settings-content">
                    <!-- Settings content will be loaded here -->
                </div>
            </div>
            <footer class="main-footer">
                <!-- Footer content -->
            </footer>
        `;

        // Initialize settings
        initSettings();
    }

    // Initialize the sidebar
    setupSidebarMenu();

    // Helper functions for each view (would be implemented based on your needs)
    function loadBusinessNetworks() {
        // Add this function to main.js
        async function loadBusinessNetworks() {
            try {
                const response = await fetch('http://localhost:3000/networks', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) throw new Error('Failed to load networks');

                const networks = await response.json();
                renderNetworks(networks);
            } catch (error) {
                console.error('Error loading networks:', error);
                alert('Failed to load networks');
            }
        }

        function renderNetworks(networks) {
            const networksContainer = document.querySelector('.card-body');
            networksContainer.innerHTML = '';

            networks.forEach(network => {
                const networkItem = document.createElement('div');
                networkItem.className = 'network-item';
                networkItem.innerHTML = `
            <div class="network-info">
                <h4>${network.name}</h4>
                <p>Version: ${network.version}</p>
            </div>
            <div class="network-actions">
                <button class="btn-action"><i class="fas fa-play"></i></button>
                <button class="btn-action"><i class="fas fa-edit"></i></button>
                <button class="btn-action"><i class="fas fa-trash"></i></button>
            </div>
        `;
                networksContainer.appendChild(networkItem);
            });
        }

        // Call this when dashboard loads
        document.addEventListener('DOMContentLoaded', () => {
            loadBusinessNetworks();

            // Display username
            const username = localStorage.getItem('username');
            if (username && document.getElementById('username-display')) {
                document.getElementById('username-display').textContent = username;
            }
        });
        // Implementation to load business networks
    }

    function initModelEditor() {
        // Implementation for model editor
    }

    function initScriptEditor() {
        // Implementation for script editor
    }

    function initACLEditor() {
        // Implementation for ACL editor
    }

    function initQueryEditor() {
        // Implementation for query editor
    }

    function loadTransactionHistory() {
        // Implementation to load transaction history
    }

    function initSettings() {
        // Implementation for settings
    }

    function showCreateNetworkModal() {
        // Implementation to show create network modal
    }


    // In main.js - ADD THESE FUNCTIONS

// Load networks from server
async function loadNetworks() {
    try {
        const response = await fetch('http://localhost:3000/networks', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) throw new Error('Network error');
        return await response.json();
    } catch (error) {
        console.error('Failed to load networks:', error);
        return [];
    }
}

// Display username on page load
document.addEventListener('DOMContentLoaded', async () => {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username-display').textContent = username;
    }
    
    // Load and display networks
    const networks = await loadNetworks();
    renderNetworks(networks);
});

// Logout functionality
document.getElementById('logout')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
});
});