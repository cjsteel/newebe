CollectionView = require '../lib/view_collection'
TagView = require './tag_view'
TagAllView = require './tag_all_view'
Tags = require '../collections/tags'
stringUtils = require '../lib/string'


module.exports = class TagsView extends CollectionView
    el: '#tag-list'

    collection: new Tags()
    view: TagView

    events:
        'keyup #new-tag-field': 'onNewTagKeyup'
        'click #new-tag-button': 'onNewTagClicked'

    template: ->
        require './templates/tags'

    afterRender: ->
        @newTagField = @$ '#new-tag-field'
        @newTagButton = @$ '#new-tag-button'
        @newTagField.keyup @onNewTagKeyup
        @newTagField.keypress @onNewTagKeypress
        @newTagField.hide()
        @newTagButton.hide()

    renderOne: (model) =>
        if model.get('name') isnt 'all'
            view = new @view model, @
        else
            view = new TagAllView model, @

        @$el.prepend view.render().el
        @add view
        @

    showNewTagForm: ->
        @newTagField.show()
        @newTagButton.show()
        @newTagField.focus()

    isFull: ->
        @collection.length > 6

    fetch: (callbacks) ->
        @remove(@views) if @views.length > 0
        @collection.fetch callbacks

    # prevent special chars in tags
    onNewTagKeypress: (event) =>
        key = event.which
        stringUtils.isSpecialChar(key)

    onNewTagKeyup: (event) =>
        @onNewTagClicked() if event.which is 13

    onNewTagClicked: =>
        unless @isFull()
            @collection.create name: @newTagField.val(),
                success: (tag) =>
                    @contactsView.onTagAdded tag
                    @newTagField.val ''
        else
            alert "You can't add more tags"

    onTagDeleted: (name) ->
        @contactsView.onTagDeleted name
