Feature: Verify search functionality for character

    Scenario Outline: Verify search with valid character
        Given The app is open on "localhost"
        When You search for character "<characterName>"
        Then Character details for "<characterName>" are displayed

        Examples:
            | characterName  |
            | Luke Skywalker |
            | Leia Organa    |
            | R2-D2          |
            | Darth Vader    |
            | Darth Maul     |

    Scenario: Verify search with invalid character
        Given The app is open on "localhost"
        When You search for character "invalid"
        Then Search result is displayed as Not Found