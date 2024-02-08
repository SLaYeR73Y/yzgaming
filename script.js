document.addEventListener('DOMContentLoaded', function() {
  // Toggle hamburger menu
  var hamburgerMenu = document.getElementById('hamburgerMenu');
  if (hamburgerMenu) {
      hamburgerMenu.addEventListener('click', function() {
          // Toggle dropdownContent if it exists
          var dropdownContent = document.getElementById('dropdownContent');
          if (dropdownContent) {
              dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
          }
      });
  }

  // Search input event listener
  var searchInput = document.getElementById('search-input');
  var searchList = document.getElementById('search-list');
  var categoryDropdown = document.getElementById('list');

  searchInput.addEventListener('input', function() {
    var query = searchInput.value;
    var category = categoryDropdown.querySelector('.selected').innerText;

    // Make an AJAX request to the search.php script
    if (query.length > 0) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'search.php?query=' + encodeURIComponent(query) + '&category=' + encodeURIComponent(category), true);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Update the search list with the results
                searchList.innerHTML = xhr.responseText;

                // Show the search list
                searchList.style.display = 'block';
            }
        };

        xhr.send();
    } else {
        // Hide the search list if there is no input
        searchList.style.display = 'none';
    }
});




  // Open product details
  document.querySelectorAll('.buy-now').forEach(button => {
      button.addEventListener('click', function() {
          showProductDetails(this); // Open the UI of the item
      });
  });

  // Dropdown functionality
  var dropdownBtnText = document.getElementById("drop-text");
  var span = document.getElementById("span");
  var icon = document.getElementById("icon1");
  var list = document.getElementById("list");
  var listItems = document.querySelectorAll(".dropdown-list-item");

  dropdownBtnText.onclick = function() {
      list.classList.toggle("show");
      icon.style.transform = list.classList.contains("show") ? "rotate(-180deg)" : "rotate(0deg)";
  };

  // Use event delegation for better performance and code simplicity
  document.addEventListener('click', function(e) {
      if (!dropdownBtnText.contains(e.target)) {
          list.classList.remove("show");
          icon.style.transform = "rotate(0deg)";
      }
  });
  listItems.forEach(function(item) {
    item.onclick = function() {
        span.innerText = this.innerText;
        searchInput.placeholder = this.innerText == "Everything" ? "Search Anything..." : "Search in " + this.innerText + "...";
        list.classList.remove("show");
        icon.style.transform = "rotate(0deg)";

        // Update the selected category
        categoryDropdown.querySelector('.selected').classList.remove('selected');
        this.classList.add('selected');

        // Trigger the input event to perform the search with the new category
        var inputEvent = new Event('input');
        searchInput.dispatchEvent(inputEvent);
    };
});


  // Attach event listeners to buttons with class 'btn-close'
  document.querySelectorAll('.btn-close, .btn-close1, .btn-close2, .btn-close3').forEach(function(button) {
      button.addEventListener('click', function() {
          closeProductDetails(this);
      });
  });

  // Add event listener for buy-now buttons
  document.querySelectorAll('.buy-now').forEach(function(buyNowButton) {
      buyNowButton.addEventListener('click', function() {
          showProductDetails(this);
      });
  });
});

function closeProductDetails(button) {
  var productDetailsContainer = button.closest('.product-details-container');
  if (productDetailsContainer) {
      productDetailsContainer.style.display = 'none';
  }
}

function showProductDetails(button) {
  var productDetails = button.nextElementSibling;
  if (productDetails) {
      productDetails.style.display = 'flex';
  }
}
