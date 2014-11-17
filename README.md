Pass Query String Variables to Page Links
===================

Small jQuery plugin to pass query string variables to some or all of the links on your page.

To use, include the plugin on your page and then instantiate it using a reference to the links you'd like to target as the jQuery selector:
````
<script src="passVarsToLinks.min.js"></script>
<script>
  $(function () {
    $('a.cta').passVarsToLinks();
  });
</script>
````

This will add all the current variables to all the target links. If one of the elements wrapped in the jQuery selector isn't a link, it will be ignored by the plugin.

You can pass the plugin a couple options in the form of an object. They're listed in the example below with descriptive comments:

````
$('a').passVarsToLinks({
  addOnly: ['exampleVar1', 'exampleVar2'], // Accepts an array of strings matching the variables you'd like to pass, other variables will be ignored
  modify: {'exampleVar1': 'new example var value'} // Accepts an object literal w/ key's referencing existing variables and values referencing modifed values to be passed to the links
});