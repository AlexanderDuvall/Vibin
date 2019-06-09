module PostsHelper
  def image_preview(f)
    url, style = f.object.avatar.present? ? [f.object.avatar, 'height:70px; width: 70px;'] : ['#', 'left: 100px; '] #just do this in a CSS file
    content_tag(:div, nil) do
      concat image_tag url, {id: 'preview_image', style: style}
      concat ''.html_safe
      concat f.button 'Remove', {type: 'button', class: 'remove_image', style: 'display:none;'}
    end
  end
  
end
