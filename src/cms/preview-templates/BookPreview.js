import React from 'react'
import PropTypes from 'prop-types'
import { BookTemplate } from '../../templates/book-page'

const BookPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags'])
  return (
    <BookTemplate
      content={widgetFor('body')}
      description={entry.getIn(['data', 'description'])}
      tags={tags && tags.toJS()}
      title={entry.getIn(['data', 'title'])}
    />
  )
}

BookPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BookPreview
