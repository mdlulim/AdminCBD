import React from 'react';
import PropTypes from 'prop-types';

import 'froala-editor/js/froala_editor.pkgd.min.js';
import  'froala-editor/js/plugins/image.min.js';
import  'froala-editor/js/plugins/video.min.js';
import  'froala-editor/js/plugins/colors.min.js';
import  'froala-editor/js/plugins/emoticons.min.js';
import  'froala-editor/js/plugins/font_family.min.js';
import  'froala-editor/js/plugins/font_size.min.js';
import  'froala-editor/js/plugins/line_height.min.js';
import  'froala-editor/js/plugins/lists.min.js';
import  'froala-editor/js/plugins/align.min.js';
import  'froala-editor/js/plugins/link.min.js';
import  'froala-editor/js/plugins/file.min.js';
import  'froala-editor/js/plugins/code_view.min.js';
import  'froala-editor/js/plugins/table.min.js';
import  'froala-editor/js/plugins/paragraph_format.min.js';
import  'froala-editor/js/plugins/paragraph_style.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/plugins/image.min.css';
import 'froala-editor/css/plugins/video.min.css';
import 'froala-editor/css/plugins/colors.min.css';
import 'froala-editor/css/plugins/emoticons.min.css';
import 'froala-editor/css/plugins/file.min.css';
import 'froala-editor/css/plugins/code_view.min.css';
import 'froala-editor/css/plugins/table.min.css';
// import 'froala-editor/css/plugins/paragraph_style.min.css';

import FroalaEditor from 'react-froala-wysiwyg';
import wysiwyg from 'static/wysiwyg.json';

const WYSIWYG = props => {
    const {
        config,
        model,
        placeholderText,
        toolbarButtons,
        setModel,
    } = props;
    function handleModelChange(model) {
        setModel(model);
    }

    return (
        <div className="wysiwyg-wrapper">
            <FroalaEditor
                model={model}
                onModelChange={handleModelChange}
                config={{
                    attribution: false,
                    placeholderText: placeholderText,
                    charCounterCount: true,
                    key: config.froala.key,
                    toolbarButtons: toolbarButtons,
                }}
            />
        </div>
    );
};

WYSIWYG.propTypes = {
    placeholderText: PropTypes.string,
    toolbarButtons: PropTypes.instanceOf(Array),
};

WYSIWYG.defaultProps = {
    placeholderText: 'Enter content here...',
    toolbarButtons: wysiwyg.toolbarButtons.default,
};

export default WYSIWYG;
