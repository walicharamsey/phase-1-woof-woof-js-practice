document.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.getElementById('dog-bar');
    const dogInfo = document.getElementById('dog-info');
    const filterButton = document.getElementById('filter-button');
    let filterOn = false;
  
    // Function to fetch and display dogs
    function fetchDogs() {
      fetch('http://localhost:3000/pups')
        .then((response) => response.json())
        .then((dogs) => {
          dogBar.innerHTML = ''; // Clear the dog bar
  
          // Iterate through the dogs and display them in the dog bar
          dogs.forEach((dog) => {
            if (!filterOn || (filterOn && dog.isGoodDog)) {
              const dogSpan = document.createElement('span');
              dogSpan.textContent = dog.name;
              dogSpan.addEventListener('click', () => showDogInfo(dog));
              dogBar.appendChild(dogSpan);
            }
          });
        });
    }
  
    // Function to show dog info in the dog-info section
    function showDogInfo(dog) {
      dogInfo.innerHTML = ''; // Clear the dog info
  
      const dogImg = document.createElement('img');
      dogImg.src = dog.image;
      const dogName = document.createElement('h2');
      dogName.textContent = dog.name;
      const dogButton = document.createElement('button');
      dogButton.textContent = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
      dogButton.addEventListener('click', () => toggleGoodDog(dog));
  
      dogInfo.appendChild(dogImg);
      dogInfo.appendChild(dogName);
      dogInfo.appendChild(dogButton);
    }
  
    // Function to toggle good dog status
    function toggleGoodDog(dog) {
      dog.isGoodDog = !dog.isGoodDog;
      fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isGoodDog: dog.isGoodDog }),
      })
        .then(() => {
          // Update the button text
          const dogButton = dogInfo.querySelector('button');
          dogButton.textContent = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
        });
    }
  
    // Event listener for the filter button
    filterButton.addEventListener('click', () => {
      filterOn = !filterOn;
      filterButton.textContent = filterOn ? 'Filter good dogs: ON' : 'Filter good dogs: OFF';
      fetchDogs(); // Re-fetch and update the dog bar
    });
  
    // Initial fetch when the page loads
    fetchDogs();
  });
  