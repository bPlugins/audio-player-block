const Style = ({ attributes, id }) => {
	const { width, alignment } = attributes;

	return <style dangerouslySetInnerHTML={{
		__html: `
		#${id}{
			text-align: ${alignment};
		}
		#${id} .bpMp3Player{
			width: ${width};
		}
		`.replace(/\s+/g, ' ')
	}} />
}
export default Style;