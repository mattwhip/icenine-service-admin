import React from 'react'
import { Motion, spring } from 'react-motion'
import chroma from 'chroma-js'

import styles from './styles.module.css'

// red
// const transparent = 'rgba(224, 16, 16, 0)';
// const dirtyColor = 'rgba(224, 16, 16, 0.75)';

// green
// const transparent = 'rgba(50, 111, 34, 0)';
// const dirtyColor = 'rgba(50, 111, 34, 0.75)';

// blue
const transparent = 'rgba(45, 125, 246, 0)';
const dirtyColor = 'rgba(45, 125, 246, 0.85)';

class DirtyBox extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const { isDirty, children, className, style } = this.props
        let displayClassName = className || '';
        let displayStyle = style || {};
        return (
            <div>
                <Motion defaultStyle={{scale: 0}} style={{scale: spring(isDirty ? 1 : 0)}}>{
                (interpolatedStyle) => {
                    let currentColor = chroma.mix(transparent, dirtyColor, interpolatedStyle.scale);
                    return <div className={`${styles.dirtyBox} ${displayClassName}`} style={{backgroundColor: currentColor, ...displayStyle}}>
                        {children}
                    </div>
                }}</Motion>
            </div>
        )
    }
}

export default DirtyBox
