import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaPlaceholder, RichText } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import MediaControl from '../../components/media-control';
import LinkControl from '../../components/link-control';
import { mediaAttributes } from '../../utils';

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Card settings', 'build-n-bloom-blocks' ) }>
					<MediaControl
						label={ __( 'Video (short, muted clip)', 'build-n-bloom-blocks' ) }
						allowedTypes={ [ 'video' ] }
						mediaId={ attributes.videoId }
						mediaUrl={ attributes.videoUrl }
						onSelect={ ( video ) => setAttributes( mediaAttributes( video, 'video' ) ) }
						onRemove={ () => setAttributes( { videoId: 0, videoUrl: '' } ) } />
					<MediaControl
						label={ __( 'Poster image (shown before the video plays)', 'build-n-bloom-blocks' ) }
						mediaId={ attributes.posterId }
						mediaUrl={ attributes.posterUrl }
						onSelect={ ( image ) => setAttributes( mediaAttributes( image, 'poster' ) ) }
						onRemove={ () => setAttributes( { posterId: 0, posterUrl: '' } ) } />
					<SelectControl
						label={ __( 'Playback', 'build-n-bloom-blocks' ) }
						value={ attributes.playback }
						options={ [
							{ label: __( 'Play on hover', 'build-n-bloom-blocks' ), value: 'hover' },
							{ label: __( 'Loop automatically', 'build-n-bloom-blocks' ), value: 'autoplay' },
						] }
						onChange={ ( playback ) => setAttributes( { playback } ) } />
					<LinkControl attributes={ attributes } setAttributes={ setAttributes } />
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="bnb-card__inner">
					<div className="bnb-card__media">
						{ attributes.videoUrl
							? <video src={ attributes.videoUrl } poster={ attributes.posterUrl || undefined } muted loop playsInline preload="metadata" />
							: <MediaPlaceholder
								icon="format-video"
								labels={ { title: __( 'Card video', 'build-n-bloom-blocks' ) } }
								accept="video/*"
								allowedTypes={ [ 'video' ] }
								onSelect={ ( video ) => setAttributes( mediaAttributes( video, 'video' ) ) } />
						}
					</div>
					<div className="bnb-card__body">
						<RichText
							tagName="h3"
							className="bnb-card__title"
							placeholder={ __( 'Card title…', 'build-n-bloom-blocks' ) }
							value={ attributes.title }
							onChange={ ( title ) => setAttributes( { title } ) } />
						<RichText
							tagName="p"
							className="bnb-card__text"
							placeholder={ __( 'Optional text…', 'build-n-bloom-blocks' ) }
							value={ attributes.text }
							onChange={ ( text ) => setAttributes( { text } ) } />
					</div>
				</div>
			</div>
		</>
	);
}
