const Style = ({ attributes, clientId }) => {
	const { width, alignment } = attributes;

	return <style dangerouslySetInnerHTML={{
		__html: `
		#bpmp3player-${clientId}{
			text-align: ${alignment};
		}
		#bpmp3player-${clientId} .music-container{
			width: ${width};
		}
		`.replace(/\s+/g, ' ')
	}} />
}
export default Style;