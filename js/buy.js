 // script for sale start


 document.addEventListener("DOMContentLoaded", function () {
    const propertiesContainer = document.querySelector(".ltn__product-tab-content-inner .row");
    const paginationContainer = document.querySelector(".ltn__pagination ul");
    const itemsPerPage = 6;
    let properties = [];
    let filteredProperties = [];
    let currentPage = 1;

    // Fetch properties from properties.json
    async function fetchProperties() {
        try {
            const response = await fetch("properties.json");
            properties = await response.json();
            filteredProperties = properties;
            renderProperties();
            renderPagination();
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    }

    function renderProperties() {
        propertiesContainer.innerHTML = "";
        let start = (currentPage - 1) * itemsPerPage;
        let end = start + itemsPerPage;
        let paginatedProperties = filteredProperties.slice(start, end);

        paginatedProperties.forEach(property => {
            let propertyHTML = `
                <div class="col-lg-12">
                    <div class="ltn__product-item ltn__product-item-4 ltn__product-item-5">
                        <div class="product-img">
                            <a href="property-details.html"><img src="${property.image}" alt="#"></a>
                        </div>
                        <div class="product-info">
                            <div class="product-badge-price">
                                <div class="product-badge">
                                    <ul>
                                        <li class="sale-badg">For Sale</li>
                                    </ul>
                                </div>
                                <div class="product-price">
                                    <span><label>price</label></span>      
                                    <span>Ksh${property.price.toLocaleString()}</span>
                                </div>
                            </div>
                            <h2 class="product-title"><a href="property-details.html?id=${property.id}">${property.title}</a></h2>

                            <div class="product-img-location">
                                <ul>
                                    <li>
                                        <a href="locations.html"><i class="flaticon-pin"></i> ${property.location}</a>
                                    </li>
                                </ul>
                            </div>
                            <ul class="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
                                <li><span>${property.bedrooms}</span> Bedroom(s)</li>
                            </ul>
                        </div>
                        <div class="product-info-bottom">
                            <div class="product-hover-action">
                                <ul>
                                    <li>
                            <a href="property-details.html?id=${property.id}" title="Product Details">
                                            <i class="flaticon-add"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>`;
            propertiesContainer.innerHTML += propertyHTML;
        });
    }

    function renderPagination() {
        paginationContainer.innerHTML = "";
        let totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

        paginationContainer.innerHTML += `<li><a href="#" data-page="prev"><i class="fas fa-angle-double-left"></i></a></li>`;
        for (let i = 1; i <= totalPages; i++) {
            paginationContainer.innerHTML += `<li class="${i === currentPage ? "active" : ""}"><a href="#" data-page="${i}">${i}</a></li>`;
        }
        paginationContainer.innerHTML += `<li><a href="#" data-page="next"><i class="fas fa-angle-double-right"></i></a></li>`;
    }

    paginationContainer.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
            let page = e.target.dataset.page;
            if (page === "prev" && currentPage > 1) currentPage--;
            else if (page === "next" && currentPage < Math.ceil(filteredProperties.length / itemsPerPage)) currentPage++;
            else if (!isNaN(page)) currentPage = parseInt(page);
            renderProperties();
            renderPagination();
        }
    });

    // Filtering Function
    function applyFilters() {
        let locationFilter = document.getElementById("locationFilter").value;
        let priceFilter = parseInt(document.getElementById("priceFilter").value) || null;
        let bedroomFilter = document.getElementById("bedroomFilter").value;
        let statusFilter = document.getElementById("statusFilter").value;

        filteredProperties = properties.filter(property => {
            return (
                (locationFilter === "all" || property.location === locationFilter) &&
                (!priceFilter || property.price <= priceFilter) &&
                (bedroomFilter === "all" || property.bedrooms.toString() === bedroomFilter) &&
                (statusFilter === "all" || property.status === statusFilter)
            );
        });

        currentPage = 1;
        renderProperties();
        renderPagination();
    }

    document.getElementById("filterButton").addEventListener("click", applyFilters);

    fetchProperties();
});


// script for sale end