// ========== PRODUCTS DATA ==========
let products = [
    {
        id: 1,
        name: "Ichikami Moisturizing Shampoo 330ml",
        category: "Hair care",
        subcategory: "Shampoo",
        price: 1200,
        oldPrice: 1350,
        rating: 5,
        reviews: 128,
        inStock: true,
        brand: "Ichikami",
        description: "Japanese moisturizing shampoo for damaged hair.",
        image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300"
    },
    {
        id: 2,
        name: "Skin Life Foaming Face Wash 160ml",
        category: "Skin care",
        subcategory: "Face wash",
        price: 1290,
        oldPrice: null,
        rating: 5,
        reviews: 95,
        inStock: true,
        brand: "Skin Life",
        description: "Gentle foaming face wash for daily use.",
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=300"
    },
    {
        id: 3,
        name: "Rohto Acnes Face Wash 160ml",
        category: "Skin care",
        subcategory: "Face wash",
        price: 2100,
        oldPrice: null,
        rating: 5,
        reviews: 67,
        inStock: true,
        brand: "Rohto",
        description: "Medicated face wash for acne prone skin.",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300"
    },
    {
        id: 4,
        name: "Diane Repair Shampoo 450ml",
        category: "Hair care",
        subcategory: "Shampoo",
        price: 2100,
        oldPrice: null,
        rating: 5,
        reviews: 156,
        inStock: true,
        brand: "Diane",
        description: "Damage repair shampoo for dry hair.",
        image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300"
    },
    {
        id: 5,
        name: "Omi Sunscreen Gel 100g",
        category: "Skin care",
        subcategory: "Sunscreen",
        price: 1450,
        oldPrice: null,
        rating: 5,
        reviews: 43,
        inStock: false,
        brand: "Omi",
        description: "UV protect gel SPF50+ PA++++",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300"
    },
    {
        id: 6,
        name: "Skin Aqua UV Essence 80g",
        category: "Skin care",
        subcategory: "Sunscreen",
        price: 1370,
        oldPrice: null,
        rating: 5,
        reviews: 89,
        inStock: false,
        brand: "Skin Aqua",
        description: "Tone up UV essence lavender",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300"
    },
    {
        id: 7,
        name: "Biore Sunscreen 90g",
        category: "Skin care",
        subcategory: "Sunscreen",
        price: 2500,
        oldPrice: null,
        rating: 5,
        reviews: 234,
        inStock: false,
        brand: "Biore",
        description: "Protective sunscreen SPF50+",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300"
    },
    {
        id: 8,
        name: "Kracie Face Wash 130g",
        category: "Skin care",
        subcategory: "Face wash",
        price: 980,
        oldPrice: null,
        rating: 5,
        reviews: 67,
        inStock: true,
        brand: "Kracie",
        description: "Peach leaf foaming face wash",
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=300"
    }
];

// Categories
const categories = {
    "Skin care": ["Face wash", "Toner", "Serum", "Moisturizer", "Sunscreen"],
    "Hair care": ["Shampoo", "Conditioner", "Mask", "Oil"],
    "Make Up": ["Foundation", "Lipstick", "Mascara"],
    "Bath & Body": ["Body wash", "Lotion"]
};

// Brands
const brands = [
    "SHISEIDO", "NIVEA", "Biore", "Diane", "KOSE", "Kracie", "ROHT3", "DAISO", "COW"
];

// ========== DOM Elements ==========
const spinner = document.getElementById('spinner');
const productsGrid = document.getElementById('productsGrid');
const categoryList = document.getElementById('categoryList');
const brandList = document.getElementById('brandList');
const brandsContainer = document.getElementById('brandsContainer');
const sectionTitle = document.getElementById('sectionTitle');
const homeBtn = document.getElementById('homeBtn');
const homeLink = document.getElementById('homeLink');
const searchBtn = document.getElementById('searchBtn');
const adminTrigger = document.getElementById('adminTrigger');
const loginModal = document.getElementById('loginModal');
const adminPass = document.getElementById('adminPass');
const loginBtn = document.getElementById('loginBtn');
const closeLogin = document.getElementById('closeLogin');
const adminPanel = document.getElementById('adminPanel');
const closeAdmin = document.getElementById('closeAdmin');
const productSelect = document.getElementById('productSelect');
const imageFile = document.getElementById('imageFile');
const uploadBtn = document.getElementById('uploadBtn');
const uploadMsg = document.getElementById('uploadMsg');
const productModal = document.getElementById('productModal');
const productDetails = document.getElementById('productDetails');
const closeProduct = document.getElementById('closeProduct');
const searchModal = document.getElementById('searchModal');
const searchInput = document.getElementById('searchInput');
const closeSearch = document.getElementById('closeSearch');
const categoryDropdown = document.getElementById('categoryDropdown');

// ========== Show/Hide Loading ==========
function showLoading() {
    spinner.style.display = 'flex';
}

function hideLoading() {
    spinner.style.display = 'none';
}

// ========== Load Categories ==========
function loadCategories() {
    let html = '';
    for (let [cat, subs] of Object.entries(categories)) {
        html += `
            <li class="has-children" data-category="${cat}">
                <span>${cat} <i class="fas fa-chevron-right"></i></span>
                <ul class="subcategory">
                    ${subs.map(sub => `<li data-subcategory="${sub}">${sub}</li>`).join('')}
                </ul>
            </li>
        `;
    }
    categoryList.innerHTML = html;
    
    // Category click
    document.querySelectorAll('.has-children > span').forEach(el => {
        el.addEventListener('click', () => {
            const cat = el.closest('li').dataset.category;
            filterByCategory(cat);
        });
    });
    
    // Subcategory click
    document.querySelectorAll('.subcategory li').forEach(el => {
        el.addEventListener('click', () => {
            const sub = el.dataset.subcategory;
            filterBySubcategory(sub);
        });
    });
    
    // Dropdown
    let dropdownHtml = '';
    for (let cat of Object.keys(categories)) {
        dropdownHtml += `<a href="#" class="dropdown-item" data-cat="${cat}">${cat}</a>`;
    }
    categoryDropdown.innerHTML = dropdownHtml;
    
    document.querySelectorAll('.dropdown-item').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            filterByCategory(el.dataset.cat);
        });
    });
}

// ========== Load Brands ==========
function loadBrands() {
    // Sidebar brands
    let brandHtml = '';
    brands.forEach(brand => {
        brandHtml += `
            <label class="brand-item">
                <input type="checkbox" class="brand-checkbox" value="${brand}">
                <span>${brand}</span>
            </label>
        `;
    });
    brandList.innerHTML = brandHtml;
    
    document.querySelectorAll('.brand-checkbox').forEach(cb => {
        cb.addEventListener('change', filterByBrands);
    });
    
    // Brands slider
    let sliderHtml = '';
    brands.forEach(brand => {
        sliderHtml += `<span class="brand-tag" data-brand="${brand}">${brand}</span>`;
    });
    brandsContainer.innerHTML = sliderHtml;
    
    document.querySelectorAll('.brand-tag').forEach(el => {
        el.addEventListener('click', () => {
            filterByBrand(el.dataset.brand);
        });
    });
}

// ========== Load Products ==========
function loadProducts(productsToShow) {
    showLoading();
    
    setTimeout(() => {
        if (productsToShow.length === 0) {
            productsGrid.innerHTML = '<div class="no-products">No products found</div>';
            hideLoading();
            return;
        }
        
        let html = '';
        productsToShow.forEach(p => {
            html += `
                <div class="product-card" data-id="${p.id}">
                    <div class="product-image">
                        <img src="${p.image}" alt="${p.name}" loading="lazy">
                        ${!p.inStock ? '<span class="stock-badge">Out of Stock</span>' : ''}
                        ${p.oldPrice ? '<span class="product-badge">Sale</span>' : ''}
                    </div>
                    <div class="product-info">
                        <div class="product-category">${p.brand}</div>
                        <h3 class="product-title">${p.name}</h3>
                        <div class="rating">
                            <span class="stars">${'★'.repeat(p.rating)}${'☆'.repeat(5-p.rating)}</span>
                            <span>(${p.reviews})</span>
                        </div>
                        <div class="price">
                            <span class="current-price">৳${p.price}</span>
                            ${p.oldPrice ? `<span class="old-price">৳${p.oldPrice}</span>` : ''}
                        </div>
                    </div>
                </div>
            `;
        });
        
        productsGrid.innerHTML = html;
        hideLoading();
        
        // Product click
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                showProduct(id);
            });
        });
    }, 500);
}

// ========== Filter Functions ==========
function filterByCategory(cat) {
    sectionTitle.textContent = `✨ ${cat}`;
    const filtered = products.filter(p => p.category === cat);
    loadProducts(filtered);
}

function filterBySubcategory(sub) {
    sectionTitle.textContent = `✨ ${sub}`;
    const filtered = products.filter(p => p.subcategory === sub);
    loadProducts(filtered);
}

function filterByBrand(brand) {
    sectionTitle.textContent = `✨ ${brand}`;
    const filtered = products.filter(p => p.brand === brand);
    loadProducts(filtered);
}

function filterByBrands() {
    const checked = Array.from(document.querySelectorAll('.brand-checkbox:checked')).map(cb => cb.value);
    if (checked.length === 0) {
        goHome();
        return;
    }
    sectionTitle.textContent = '✨ Selected Brands';
    const filtered = products.filter(p => checked.includes(p.brand));
    loadProducts(filtered);
}

function searchProducts(query) {
    query = query.toLowerCase().trim();
    if (!query) {
        goHome();
        return;
    }
    sectionTitle.textContent = `🔍 ${query}`;
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
    loadProducts(filtered);
}

// ========== Show Product ==========
function showProduct(id) {
    const p = products.find(p => p.id == id);
    if (!p) return;
    
    const html = `
        <div class="product-details">
            <img src="${p.image}" alt="${p.name}">
            <h2>${p.name}</h2>
            <div class="rating">
                <span class="stars">${'★'.repeat(p.rating)}${'☆'.repeat(5-p.rating)}</span>
                <span>${p.rating} (${p.reviews} reviews)</span>
            </div>
            <div class="price">
                <span class="current-price">৳${p.price}</span>
                ${p.oldPrice ? `<span class="old-price">৳${p.oldPrice}</span>` : ''}
            </div>
            <p class="description">${p.description}</p>
            <p><strong>Brand:</strong> ${p.brand}</p>
            <p><strong>Category:</strong> ${p.category}</p>
            <p><strong>Stock:</strong> ${p.inStock ? 'In Stock' : 'Out of Stock'}</p>
        </div>
    `;
    productDetails.innerHTML = html;
    productModal.style.display = 'flex';
}

// ========== Go Home ==========
function goHome() {
    sectionTitle.textContent = '✨ Restocked Recently';
    loadProducts(products);
    
    // Uncheck all brands
    document.querySelectorAll('.brand-checkbox').forEach(cb => cb.checked = false);
}

// ========== Admin Functions ==========
function populateProductSelect() {
    let html = '';
    products.forEach(p => {
        html += `<option value="${p.id}">${p.name}</option>`;
    });
    productSelect.innerHTML = html;
}

function showUploadMessage(msg, type) {
    uploadMsg.textContent = msg;
    uploadMsg.className = `upload-msg ${type}`;
    setTimeout(() => {
        uploadMsg.style.display = 'none';
    }, 3000);
}

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
    showLoading();
    
    loadCategories();
    loadBrands();
    loadProducts(products);
    populateProductSelect();
    
    setTimeout(hideLoading, 1000);
    
    // Home
    homeBtn.addEventListener('click', goHome);
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        goHome();
    });
    
    // Search
    searchBtn.addEventListener('click', () => {
        searchModal.style.display = 'flex';
        searchInput.value = '';
        searchInput.focus();
    });
    
    closeSearch.addEventListener('click', () => {
        searchModal.style.display = 'none';
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchProducts(searchInput.value);
            searchModal.style.display = 'none';
        }
    });
    
    // Admin trigger
    adminTrigger.addEventListener('click', () => {
        loginModal.style.display = 'flex';
        adminPass.value = '';
    });
    
    closeLogin.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });
    
    loginBtn.addEventListener('click', () => {
        if (adminPass.value === 'shinrin@2024') {
            loginModal.style.display = 'none';
            adminPanel.style.display = 'flex';
        } else {
            alert('Wrong password!');
        }
    });
    
    adminPass.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') loginBtn.click();
    });
    
    closeAdmin.addEventListener('click', () => {
        adminPanel.style.display = 'none';
    });
    
    // Upload
    uploadBtn.addEventListener('click', () => {
        const id = productSelect.value;
        const file = imageFile.files[0];
        
        if (!file) {
            showUploadMessage('Select an image!', 'error');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const idx = products.findIndex(p => p.id == id);
            if (idx !== -1) {
                products[idx].image = e.target.result;
                loadProducts(products);
                showUploadMessage('Uploaded!', 'success');
                imageFile.value = '';
            }
        };
        
        reader.readAsDataURL(file);
    });
    
    // Close modals
    closeProduct.addEventListener('click', () => {
        productModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === productModal) productModal.style.display = 'none';
        if (e.target === searchModal) searchModal.style.display = 'none';
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === adminPanel) adminPanel.style.display = 'none';
    });
});