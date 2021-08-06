@UI
Feature: Navigating to login

    @test
    Scenario: Perform Navigation
        Given I open the login page
        When I fill username input with 'hypeflame'
        When I fill password input with 'test123'
        Then Click enter button
