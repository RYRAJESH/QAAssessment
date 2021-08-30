Feature: Verify search functionality for planet

    Scenario Outline: Verify search with valid planet
        Given The app is open on "localhost"
        When You search for planet "<planetName>"
        Then Planet details for "<planetName>" are displayed

        Examples:
            | planetName |
            | Alderaan   |
            | Hoth       |

    Scenario: Verify search with invalid planet
        Given The app is open on "localhost"
        When You search for planet "invalid"
        Then Search result is displayed as Not Found