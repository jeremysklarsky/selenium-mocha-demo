var should = require('chai').should();
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
var driver;

test.describe('Wikipedia', function() {

  beforeEach(function(){
    driver = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();    
  });

  afterEach(function(){
    driver.quit();
  });

  test.it('should work', function() {
    this.timeout(4000);
    // navigatge to page
    driver.get('http://www.wikipedia.com');
    // check if we got there
    driver.getTitle().then(function(title) {
      title.should.equal("Wikipedia");
    });
  });

  test.it('should be able to search for an article', function() {
    this.timeout(8000);
    // navigate to home page
    driver.get('http://www.wikipedia.com');
    // find search bar and type in input
    driver.findElement(webdriver.By.name("search")).sendKeys("javascript");
    // click submit
    driver.findElement(webdriver.By.name("go")).click();
    // check if we got sent where we wanted to be sent
    driver.getTitle().then(function(title){
      title.should.include("JavaScript");
    });
  });

  test.it('should be able to expand and collapse menus', function(){
    this.timeout(6000);
    // navigate to page
    driver.get('http://en.wikipedia.org/wiki/JavaScript');
    // find "show" button for collapsed menu
    var element = driver.findElement({id:'collapseButton0'});
    element.getText().then(function(text){
      text.should.equal("show");
    });
    // click button, text should change to hide
    element.click();
    element.getText().then(function(text){
      text.should.equal("hide");
    });
    // click it again, it should revert to show
    element.click();
    element.getText().then(function(text){
      text.should.equal("show");
    });
  });

  test.it('should be able to navigate to a new page by clicking a link', function(){
    this.timeout(5000);
    // navigate to page
    driver.get('http://en.wikipedia.org/wiki/JavaScript');
    // find a link and click
    driver.findElement(webdriver.By.partialLinkText("jQuery")).click();  
    // make sure clicking link navigated us to intended destination
    driver.getTitle().then(function(title){
      title.should.include("jQuery");
    });
  });
});





