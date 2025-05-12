<script>
  // You can add any necessary imports here
</script>

<svelte:head>
  <title>Product Search App: Code Explanation Guide</title>
</svelte:head>

<div class="container">
  <h1>Product Search App: Code Breakdown</h1>

  <div class="section">
    <h2>1. Product Database Structure</h2>
    <pre><code>{`
const productDatabase = {
    "PRD001": {
        name: "Wireless Earbuds",
        price: 19.99,
        category: "Electronics",
        tags: ["audio", "wireless", "bluetooth"],
        inStock: true,
        stockLevel: 45
    }
    // ... more products
};
`}</code></pre>
    <p><strong>Key Concept</strong>: This is an object where:</p>
    <ul>
      <li>Each key is a unique product ID (e.g., "PRD001")</li>
      <li>The value is another object with product details</li>
      <li>Allows for easy lookup and searching of products</li>
    </ul>
  </div>

  <div class="section">
    <h2>2. Search Function Explained</h2>
    <pre><code>{`
function searchProducts(criteria) {
    return Object.keys(productDatabase).filter(key => {
        const product = productDatabase[key];
        
        for (const [criteriaKey, criteriaValue] of Object.entries(criteria)) {
            switch(criteriaKey) {
                case 'category':
                    if (product.category !== criteriaValue) return false;
                    break;
                // ... other search conditions
            }
        }
        
        return true;
    });
}
`}</code></pre>
    <p><strong>Breaking Down the Search Function</strong>:</p>
    <ol>
      <li><code>Object.keys(productDatabase)</code> gets all product IDs</li>
      <li><code>.filter()</code> creates a new array with products that match ALL criteria</li>
      <li>For each product, check if it meets ALL search conditions</li>
      <li>Return <code>true</code> to keep the product, <code>false</code> to filter it out</li>
    </ol>
  </div>

  <div class="section">
    <h2>3. Search Button Event Listener</h2>
    <pre><code>{`
document.getElementById('searchButton').addEventListener('click', function() {
    const searchType = document.getElementById('searchType').value;
    let searchCriteria = {};

    switch(searchType) {
        case 'category':
            searchCriteria = { 
                category: document.getElementById('categorySelect').value 
            };
            break;
        // ... other search types
    }

    const results = searchProducts(searchCriteria);

    // Display results
    resultsDiv.innerHTML = results.map(key => {
        const product = productDatabase[key];
        return \`
            <div class="product-card">
                <h3>\${product.name}</h3>
                <!-- ... product details -->
            </div>
        \`;
    }).join('');
});
`}</code></pre>
    <p><strong>Key Steps</strong>:</p>
    <ol>
      <li>Get the search type from the dropdown</li>
      <li>Construct search criteria based on selected inputs</li>
      <li>Call <code>searchProducts()</code> with the criteria</li>
      <li>Map results to HTML product cards</li>
      <li>Display the results</li>
    </ol>
  </div>

  <div class="section">
    <h2>4. Dynamic Search Type Handling</h2>
    <pre><code>{`
document.getElementById('searchType').addEventListener('change', function() {
    // Hide all search inputs
    ['categorySearch', 'priceSearch', 'tagSearch', 'stockSearch']
        .forEach(id => {
            document.getElementById(id).style.display = 'none';
        });

    // Show selected search type
    switch(this.value) {
        case 'category':
            document.getElementById('categorySearch').style.display = 'block';
            break;
        // ... other search types
    }
});
`}</code></pre>
    <p><strong>How It Works</strong>:</p>
    <ul>
      <li>Listens for changes in the search type dropdown</li>
      <li>Hides all search input sections</li>
      <li>Shows only the relevant search inputs</li>
    </ul>
  </div>

  <div class="section">
    <h2>5. Key JavaScript Concepts Demonstrated</h2>
    <h3>1. Object Manipulation</h3>
    <ul>
      <li>Using <code>Object.keys()</code> to get product IDs</li>
      <li>Using <code>Object.entries()</code> to iterate over object properties</li>
    </ul>

    <h3>2. Array Methods</h3>
    <ul>
      <li><code>.filter()</code> to search through products</li>
      <li><code>.map()</code> to transform search results into HTML</li>
    </ul>

    <h3>3. Event Handling</h3>
    <ul>
      <li><code>addEventListener()</code> for interactive user interface</li>
      <li>Handling different types of user interactions</li>
    </ul>

    <h3>4. Dynamic UI</h3>
    <ul>
      <li>Showing/hiding elements based on user selection</li>
      <li>Dynamically generating HTML content</li>
    </ul>
  </div>

  <div class="section">
    <h2>Learning Takeaways</h2>
    <ul>
      <li>Objects are powerful for storing structured data</li>
      <li>You can search through objects using various methods</li>
      <li>JavaScript provides flexible ways to manipulate and display data</li>
      <li>Event listeners make web applications interactive</li>
    </ul>
  </div>

  <div class="section">
    <h2>Potential Improvements</h2>
    <ol>
      <li>Add more search criteria</li>
      <li>Implement more advanced filtering</li>
      <li>Add sorting options</li>
      <li>Create pagination for large product lists</li>
    </ol>
  </div>
</div>

<style>
  .container {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    color: #333;
  }
  
  h1, h2 {
    color: #2c3e50;
    border-bottom: 1px solid #ecf0f1;
    padding-bottom: 10px;
  }
  
  pre {
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    overflow-x: auto;
  }
  
  code {
    background-color: #f1f1f1;
    padding: 2px 4px;
    border-radius: 4px;
    font-family: Consolas, monospace;
  }
  
  .section {
    margin-bottom: 30px;
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 5px;
  }
</style>