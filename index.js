document.addEventListener("DOMContentLoaded", function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'


    // Challenge 1
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const imageContainer = document.querySelector("div#dog-image-container")

            data.message.forEach(img => {
                const imageEl = document.createElement("img")
                imageEl.src = img
                imageContainer.appendChild(imageEl)
            })

        })

    // Challeneg2 
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const array = data.message
            const dogBreeds = document.querySelector("ul#dog-breeds")
            const dogBreedArray = []

            function deepArray(target) {
                if (typeof target === "object") {
                    for (const key in target) {
                        deepArray(target[key])
                    }
                } else {
                    dogBreedArray.push(target)
                }
            }

            function updateDogList(array) {
                dogBreeds.innerHTML = ''

                for (let i = 0; i < array.length; i++) {
                    const liEl = document.createElement("li")
                    dogBreeds.appendChild(liEl).innerHTML = array[i]
                }
            }

            // Challenge 3

            function eventListeners() {
                const dogLi = document.querySelectorAll("li")

                dogLi.forEach(li => {
                    li.addEventListener("click", function() {
                        console.log(this)
                        this.style.color = "red"
                    })

                    li.addEventListener("mouseover", function() {
                        this.style.cursor = "pointer"
                    })
                })
            }

            // Challenge 4

            function selectFilter() {
                const select = document.querySelector("select")

                select.addEventListener("change", function(e) {

                    const filterArray = dogBreedArray.filter(letter => {
                        return letter.charAt(0) === select.value
                    })

                    updateDogList(filterArray)

                })
            }


            deepArray(array)
            updateDogList(dogBreedArray)
            eventListeners()
            selectFilter()

        })



})