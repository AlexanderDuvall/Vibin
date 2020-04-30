module AlbumsHelper

  # name is the name for the link
  # f is the variable from the view
  # association is the model
  def link_to_add_fields(name = nil, f = nil, association = nil, options = nil, html_options = nil, &block)
    # If a block is provided there is no name attribute and the arguments are
    # shifted with one position to the left. This re-assigns those values.
    # ONLY SHIFTS IF BLOCK GIVEN
    f, association, options, html_options = name, f, association, options if block_given?

    options = {} if options.nil? #always null
    html_options = {} if html_options.nil?# always null
    #never checks-------------
    if options.include? :locals
      locals = options[:locals]
    else
      locals = {}
    end
    #never checks-------------
    partial = "songs/album_form"  #self explanatory
    # Render the form fields from a file with the association name provided
    new_object = f.object.class.reflect_on_association(association).klass.new
    fields = f.fields_for(association, new_object, child_index: 'new_record') do |builder|
      render(partial, locals.merge!(song: builder))
    end

    # The rendered fields are sent with the link within the data-form-prepend attr
    html_options['data-form-prepend'] = raw CGI::escapeHTML(fields)
    html_options['href'] = ''

    content_tag(:a, name, html_options, &block)
  end
end
