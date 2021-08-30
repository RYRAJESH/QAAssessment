Feature: Verify the functionalities of additional flows of application

    Scenario Outline: After a successful result displayed for character search, if the search form is cleared and clicked Search, empty results list should be displayed
        Given The app is open on "localhost"
        When You search for character "<characterName>"
        Then Character details for "<characterName>" are displayed
        When Search form is cleared and clicked Search
        Then Previous search results are cleared

        Examples:
            | characterName |
            | Leia Organa   |

    Scenario Outline: After a successful result displayed for planet search, if the search form is cleared and clicked Search, empty results list should be displayed
        Given The app is open on "localhost"
        When You search for planet "<planetName>"
        Then Planet details for "<planetName>" are displayed
        When Search form is cleared and clicked Search
        Then Previous search results are cleared

        Examples:
            | planetName |
            | Alderaan   |

    Scenario Outline: Verify search with valid character using Enter key
        Given The app is open on "localhost"
        When You search for character "<characterName>" with Enter key
        Then Character details for "<characterName>" are displayed

        Examples:
            | characterName  |
            | Luke Skywalker |

    Scenario Outline: Verify search with valid planet using Enter key
        Given The app is open on "localhost"
        When You search for planet "<planetName>" with Enter key
        Then Planet details for "<planetName>" are displayed

        Examples:
            | planetName |
            | Alderaan   |

    Scenario Outline: After a successful result displayed for character, if you switch to planet radio button and click search, Not Found should be displayed
        Given The app is open on "localhost"
        When You search for character "<characterName>"
        Then Character details for "<characterName>" are displayed
        When You switch from character to planet radio button and search
        Then Search result is displayed as Not Found

        Examples:
            | characterName |
            | Leia Organa   |

    Scenario Outline: After a successful result displayed for planet, if you switch to character radio button and click search, Not Found should be displayed
        Given The app is open on "localhost"
        When You search for planet "<planetName>"
        Then Planet details for "<planetName>" are displayed
        When You switch from planet to character radio button and search
        Then Search result is displayed as Not Found

        Examples:
            | planetName |
            | Alderaan   |

    Scenario Outline: Verify search with valid character matching multiple results
        Given The app is open on "localhost"
        When You search for character "<characterName>"
        Then Multiple Character results for "<characterName>" are displayed

        Examples:
            | characterName |
            | Darth         |
            | Da            |

    Scenario Outline: Verify search with valid planet matching multiple results
        Given The app is open on "localhost"
        When You search for planet "<planetName>"
        Then Multiple Planet results for "<planetName>" are displayed

        Examples:
            | planetName |
            | Al         |