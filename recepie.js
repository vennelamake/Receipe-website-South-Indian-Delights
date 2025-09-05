/*document.addEventListener("DOMContentLoaded", () => {
  const get_meal_btn = document.getElementById("get_meal");
  const meal_container = document.getElementById("meal");

  if (get_meal_btn && meal_container) {
    get_meal_btn.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default behavior, if any
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian")
        .then((res) => res.json())
        .then((res) => {
          createMeal(res.meals[0]);
        })
        .catch((e) => {
          console.error("Error fetching meal:", e);
        });
    });
  }

  const createMeal = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }

    const newInnerHTML = `
      <div class="row">
        <div class="columns img-info">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <div class="info">
            ${
              meal.strCategory
                ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
                : ""
            }
            ${
              meal.strArea
                ? `<p><strong>Area:</strong> ${meal.strArea}</p>`
                : ""
            }
            ${
              meal.strTags
                ? `<p><strong>Tags:</strong> ${meal.strTags
                    .split(",")
                    .join(", ")}</p>`
                : ""
            }
            <h5>Ingredients:</h5>
            <ul>${ingredients.map((ing) => `<li>${ing}</li>`).join("")}</ul>
          </div>
        </div>
        <div class="columns seven">
          <h4>${meal.strMeal}</h4>
          <p>${meal.strInstructions}</p>
        </div>
      </div>
      ${
        meal.strYoutube
          ? `
        <div class="row">
          <h5>Video Recipe</h5>
          <iframe width="420" height="315" src="https://www.youtube.com/embed/${meal.strYoutube.slice(
            -11
          )}"></iframe>
        </div>`
          : ""
      }
    `;

    meal_container.innerHTML = newInnerHTML;
  };
});*/
document.addEventListener("DOMContentLoaded", () => {
  const get_meal_btn = document.getElementById("get_meal");
  const meal_container = document.getElementById("meal");

  if (get_meal_btn && meal_container) {
    get_meal_btn.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default behavior, if any
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian")
        .then((res) => res.json())
        .then((res) => {
          const randomMeal =
            res.meals[Math.floor(Math.random() * res.meals.length)];
          if (randomMeal) {
            fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal.idMeal}`
            )
              .then((res) => res.json())
              .then((res) => {
                createMeal(res.meals[0]);
              })
              .catch((err) => {
                console.error("Error fetching meal details:", err);
                meal_container.innerHTML =
                  "<p>Something went wrong while fetching meal details.</p>";
              });
          } else {
            meal_container.innerHTML =
              "<p>No meals found in the Indian cuisine dataset.</p>";
          }
        })
        .catch((err) => {
          console.error("Error fetching meal list:", err);
          meal_container.innerHTML =
            "<p>Something went wrong while fetching Indian meals.</p>";
        });
    });
  }

  const createMeal = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }

    const newInnerHTML = `
      <div class="row">
        <div class="columns img-info">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <div class="info">
            ${
              meal.strCategory
                ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
                : ""
            }
            ${
              meal.strArea
                ? `<p><strong>Area:</strong> ${meal.strArea}</p>`
                : ""
            }
            ${
              meal.strTags
                ? `<p><strong>Tags:</strong> ${meal.strTags
                    .split(",")
                    .join(", ")}</p>`
                : ""
            }
            <h5>Ingredients:</h5>
            <ul>${ingredients.map((ing) => `<li>${ing}</li>`).join("")}</ul>
          </div>
        </div>
        <div class="columns seven">
          <h4>${meal.strMeal}</h4>
          <p>${meal.strInstructions}</p>
        </div>
      </div>
      ${
        meal.strYoutube
          ? `
        <div class="row">
          <h5>Video Recipe</h5>
          <iframe width="420" height="315" src="https://www.youtube.com/embed/${meal.strYoutube.slice(
            -11
          )}"></iframe>
        </div>`
          : ""
      }
    `;

    meal_container.innerHTML = newInnerHTML;
  };
});
