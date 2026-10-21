import { useBlockProps, RichText } from '@wordpress/block-editor';
import { linkWrapper } from '../../utils';

export default function save( { attributes } ) {
	const { Tag, linkProps } = linkWrapper( attributes );
	const autoplay = attributes.playback === 'autoplay' ? { autoplay: true } : {};

	return (
		<div { ...useBlockProps.save( { 'data-playback': attributes.playback } ) }>
			<Tag className="bnb-card__inner" { ...linkProps }>
				{ attributes.videoUrl &&
					<div className="bnb-card__media">
						<video
							className="bnb-card__video"
							src={ attributes.videoUrl }
							poster={ attributes.posterUrl || undefined }
							muted
							loop
							playsinline
							preload="metadata"
							{ ...autoplay } />
					</div>
				}
				{ ( ! RichText.isEmpty( attributes.title ) || ! RichText.isEmpty( attributes.text ) ) &&
					<div className="bnb-card__body">
						{ ! RichText.isEmpty( attributes.title ) &&
							<RichText.Content tagName="h3" className="bnb-card__title" value={ attributes.title } />
						}
						{ ! RichText.isEmpty( attributes.text ) &&
							<RichText.Content tagName="p" className="bnb-card__text" value={ attributes.text } />
						}
					</div>
				}
			</Tag>
		</div>
	);
}
