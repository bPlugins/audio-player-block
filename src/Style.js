const Style = ({ attributes, clientId }) => {
	const { width, alignment } = attributes;

	return <style dangerouslySetInnerHTML={{
		__html: `
		#bpMp3Player-${clientId}{
			text-align: ${alignment};
		}
		#bpMp3Player-${clientId} .bpMp3Player{
			width: ${width};
		}
		`.replace(/\s+/g, ' ')
	}} />
}
export default Style;