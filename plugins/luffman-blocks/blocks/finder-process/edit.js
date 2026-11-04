import { __, sprintf } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { CheckboxControl, PanelBody, TextControl } from '@wordpress/components';
import { cleanList } from '../process-finder/save';

export default function Edit( { attributes, setAttributes, context } ) {
	const materials = cleanList( context[ 'luffman-blocks/materials' ] );
	const priorities = cleanList( context[ 'luffman-blocks/priorities' ] );

	function toggleMaterial( material, isChecked ) {
		setAttributes( {
			materials: isChecked
				? [ ...attributes.materials, material ]
				: attributes.materials.filter( ( item ) => item !== material ),
		} );
	}

	function setRank( priority, text ) {
		setAttributes( { ranks: { ...attributes.ranks, [ priority ]: Number( text ) || 0 } } );
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Suits these materials', 'luffman-blocks' ) }>
					{ materials.map( ( material ) => (
						<CheckboxControl
							key={ material }
							label={ material }
							checked={ attributes.materials.includes( material ) }
							onChange={ ( isChecked ) => toggleMaterial( material, isChecked ) } />
					) ) }
				</PanelBody>
				<PanelBody title={ __( 'Suits these thicknesses (mm)', 'luffman-blocks' ) }>
					<TextControl
						label={ __( 'From', 'luffman-blocks' ) }
						help={ __( '0 means no lower limit.', 'luffman-blocks' ) }
						type="number"
						value={ attributes.minThickness }
						onChange={ ( text ) => setAttributes( { minThickness: Number( text ) || 0 } ) } />
					<TextControl
						label={ __( 'Up to', 'luffman-blocks' ) }
						help={ __( '0 means no upper limit.', 'luffman-blocks' ) }
						type="number"
						value={ attributes.maxThickness }
						onChange={ ( text ) => setAttributes( { maxThickness: Number( text ) || 0 } ) } />
				</PanelBody>
				<PanelBody title={ __( 'Ranking', 'luffman-blocks' ) }>
					<p>{ __( '1 is recommended first. 0 means it is not offered for that priority.', 'luffman-blocks' ) }</p>
					{ priorities.map( ( priority ) => (
						<TextControl
							key={ priority }
							/* translators: %s: priority name */
							label={ sprintf( __( 'Rank for "%s"', 'luffman-blocks' ), priority ) }
							type="number"
							value={ attributes.ranks[ priority ] || 0 }
							onChange={ ( text ) => setRank( priority, text ) } />
					) ) }
				</PanelBody>
			</InspectorControls>

			<li { ...useBlockProps( { className: 'luffman-finder__process' } ) }>
				<RichText
					tagName="h3"
					className="luffman-finder__name"
					placeholder={ __( 'Process name…', 'luffman-blocks' ) }
					allowedFormats={ [] }
					value={ attributes.name }
					onChange={ ( name ) => setAttributes( { name } ) } />
				<RichText
					tagName="p"
					className="luffman-finder__why"
					placeholder={ __( 'Why it suits the job…', 'luffman-blocks' ) }
					value={ attributes.why }
					onChange={ ( why ) => setAttributes( { why } ) } />
				<dl className="luffman-finder__facts">
					<div><dt>{ __( 'Tolerance', 'luffman-blocks' ) }</dt><RichText tagName="dd" placeholder="±0.0mm" allowedFormats={ [] } value={ attributes.tolerance } onChange={ ( tolerance ) => setAttributes( { tolerance } ) } /></div>
					<div><dt>{ __( 'Thickness', 'luffman-blocks' ) }</dt><RichText tagName="dd" placeholder={ __( 'Up to 0mm', 'luffman-blocks' ) } allowedFormats={ [] } value={ attributes.thickness } onChange={ ( thickness ) => setAttributes( { thickness } ) } /></div>
					<div><dt>{ __( 'Bed size', 'luffman-blocks' ) }</dt><RichText tagName="dd" placeholder="0m × 0m" allowedFormats={ [] } value={ attributes.bedSize } onChange={ ( bedSize ) => setAttributes( { bedSize } ) } /></div>
				</dl>
			</li>
		</>
	);
}
