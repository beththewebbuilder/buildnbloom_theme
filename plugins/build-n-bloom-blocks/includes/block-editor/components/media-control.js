import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

// Sidebar control for choosing, replacing and removing an image or video from the media library
export default function MediaControl( { label, allowedTypes = [ 'image' ], mediaId, mediaUrl, onSelect, onRemove } ) {
	const isVideo = allowedTypes.includes( 'video' );

	return (
		<div className="full-width-control-wrapper bnb-media-control">
			<div className="custom-label">{ label }</div>
			{ mediaUrl && ( isVideo
				? <video className="bnb-media-control__preview" src={ mediaUrl } muted />
				: <img className="bnb-media-control__preview" src={ mediaUrl } alt="" />
			) }
			<MediaUploadCheck>
				<div className="flex-container">
					<MediaUpload
						allowedTypes={ allowedTypes }
						value={ mediaId }
						onSelect={ onSelect }
						render={ ( { open } ) => (
							<Button className="flex-item" variant={ mediaUrl ? 'secondary' : 'primary' } onClick={ open }>
								{ mediaUrl ? __( 'Replace', 'build-n-bloom-blocks' ) : __( 'Choose', 'build-n-bloom-blocks' ) }
							</Button>
						) }
					/>
					{ mediaUrl &&
						<Button className="flex-item" variant="secondary" isDestructive onClick={ onRemove }>
							{ __( 'Remove', 'build-n-bloom-blocks' ) }
						</Button>
					}
				</div>
			</MediaUploadCheck>
		</div>
	);
}
