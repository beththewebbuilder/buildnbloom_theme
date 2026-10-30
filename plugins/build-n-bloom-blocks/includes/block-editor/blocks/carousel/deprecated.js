import { CarouselMarkup } from './save';
import json from './block.json';

const { arrowColor, arrowBackgroundColor, autoplaySpeed, ...v1Attributes } = json.attributes;

// v1 (before Slick): autoplay was set in seconds and saved as data-autoplay
const v1 = {
	attributes: {
		...v1Attributes,
		autoplaySeconds: {
			type: 'number',
			default: 5,
		},
	},
	supports: json.supports,
	save( { attributes } ) {
		return (
			<CarouselMarkup
				attributes={ attributes }
				data={ {
					'data-autoplay': attributes.autoplay ? String( attributes.autoplaySeconds ) : undefined,
					'data-loop': attributes.loop ? 'true' : undefined,
				} } />
		);
	},
	migrate( { autoplaySeconds, ...attributes } ) {
		return { ...attributes, autoplaySpeed: autoplaySeconds * 1000 };
	},
};

export default [ v1 ];
