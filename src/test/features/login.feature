Feature: Validate error messages on Login screen

Background: User logs into the Application
    Given User navigates to the login Page

Scenario: Validate invalid credentials flow
When User enters invalid credentials to login
Then User validates the error message displayed