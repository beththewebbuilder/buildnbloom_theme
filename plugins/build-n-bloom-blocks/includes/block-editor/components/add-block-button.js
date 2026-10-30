import { Inserter } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

// Replaces the small "+" appender in container blocks. Set up like WordPress's own ButtonBlockAppender:
// the quick inserter only lists the blocks allowed in the container (without it, every block was offered).
export default function AddBlockButton( { rootClientId, label } ) {
	return (
		<Inserter
			rootClientId={ rootClientId }
			position="bottom center"
			isAppender
			__experimentalIsQuick
			renderToggle={ ( { onToggle, disabled } ) => (
				<Button className="bnb-add-block-button" variant="secondary" onClick={ onToggle } disabled={ disabled }>
					{ label }
				</Button>
			) } />
	);
}
