Feature: Shopping feature

  Background: User logs into the Application
    Given User navigates to the login Page
    When User enters valid credentials to login

  Scenario: Validate Add to Cart functionality
    Then User validates the Home Page is displayed correctly
    When User selects "Sauce Labs Onesie" and "Sauce Labs Fleece Jacket" product to add to Cart
    Then User validates the count on the cart icon and clicks on cart icon
    When User clicks the checkout button and completes the transaction
    Then User validate the order confirmation screen
