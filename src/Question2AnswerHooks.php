<?php

class Question2AnswerHooks
{
	/**
	 * Register any render callbacks with the parser
	 */
	public static function onParserFirstCallInit( Parser $parser )
	{
		// Create a function hook associating the "question2answer" magic word with renderQuestion2Answer()
		$parser->setFunctionHook( 'question2answer', [ self::class, 'renderQuestion2Answer' ] );

		$title = Title::newFromText('FICHE_CEPAGE_MUSCARIS_B.pdf');

	}

	/**
	 * Render the output of {{#question2answer:}}.
	 */
	public static function renderQuestion2Answer( Parser $parser )
	{
		// The input parameters are wikitext with templates expanded.
		// The output should be wikitext too.
		$keywords = array_slice( func_get_args(), 1 ) ;

		$parser->getOutput()->addModules('ext.Question2Answer.script');

		$output = '<div class="container">
					<div class="qa-main col-md-9 col-xs-12 pull-left">
						<div class="qa-part-q-list">
							<div class="qa-q-list" data-q2aurl="'.$GLOBALS['wgQuestion2AnswerURL'].'" data-searchquery="'.implode(',', $keywords).'"></div>
						</div>
						<div class="qa-suggest-next col-xs-12 text-center clearfix alert" style="position: unset">
							Commencer par <a href="'.$GLOBALS['wgQuestion2AnswerURL'].'ask?tags='.implode(',', $keywords).'">poser une question</a> .
						</div>
					</div>
					<div class="row">
						<div class="col-sm result">
						</div>
					</div>
				</div>';

		return [ $output, 'noparse' => false, 'isHTML' => true ];
	}

}