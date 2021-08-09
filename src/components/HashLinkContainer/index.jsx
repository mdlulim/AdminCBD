import { LinkContainer } from 'react-router-bootstrap';
import { genericHashLink } from 'react-router-hash-link';

//  this enables routing to anchors inside pages
const HashLinkContainer = (props) => genericHashLink(props, LinkContainer)

export default HashLinkContainer