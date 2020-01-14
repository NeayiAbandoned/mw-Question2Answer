# mw-question2answer

A mediawiki extension that brings question2answer in wiki pages

## Installation
* Download and copy the folder in your mediawiki extensions, so that it reads : extensions/Question2Answer (remove the mv- at the front)
* Add the following to your LocalSettings.php (using the URL of your question2answer instance): 
```
wfLoadExtension( 'Question2Answer' );
$wgQuestion2AnswerURL = 'https://questions.tripleperformance.fr/';    
```
* You also need to install [https://github.com/neayi/q2a-rest-api](https://github.com/neayi/q2a-rest-api) on your question2answer instance

## Usage
Add the questions in your page by adding the following code:

    {{#question2answer:keyword1|keyword2}}

keyword1 and keyword2 are two search terms that are passed to the question2answer instance in order to return results. You can have as many keywords as you want, separated by pipes. The search will return results with either keywords (OR).

## Customization
The css lies in Question2Answer/modules/ext.Question2Answer.css and is generated from the mediawiki_questions.less in the less folder. You can edit and compile the css with the following command:

    lessc --compress donut.less ..\modules\ext.Question2Answer.css

