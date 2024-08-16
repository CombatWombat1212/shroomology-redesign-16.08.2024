
// Register the new meta box
function add_product_info_meta_box() {
    add_meta_box(
        'product_info_meta_box',         // ID of the meta box
        'Product Info',                  // Title of the meta box
        'product_info_meta_box_html',    // Callback function
        'product',                       // Post type
        'normal',                        // Context ('normal', 'side', 'advanced')
        'high'                           // Priority ('low', 'default', 'high')
    );
}
add_action('add_meta_boxes', 'add_product_info_meta_box');

// Callback function to display the meta box content
function product_info_meta_box_html($post) {
    // Nonce field for security
    wp_nonce_field('product_info_meta_box', 'product_info_meta_box_nonce');

    // Retrieve the current value for the field (if any)
    $product_name = get_post_meta($post->ID, '_product_info_name', true);

	
	
	
	
    // Output the field
    echo '<label for="product_info_name">Name</label>';
    echo '<input type="text" id="product_info_name" name="product_info_name" value="' . esc_attr($product_name) . '" />';
	
	
	
	
}

// Save the custom field data
function save_product_info_meta_box_data($post_id) {
    // Check for nonce security
    if (!isset($_POST['product_info_meta_box_nonce'])) {
        return;
    }
    if (!wp_verify_nonce($_POST['product_info_meta_box_nonce'], 'product_info_meta_box')) {
        return;
    }

    // Check for auto-save
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    // Check user permissions
    if (isset($_POST['post_type']) && 'product' == $_POST['post_type']) {
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
    }

    // Save or update the field
    if (isset($_POST['product_info_name'])) {
        update_post_meta($post_id, '_product_info_name', sanitize_text_field($_POST['product_info_name']));
    }
}
add_action('save_post', 'save_product_info_meta_box_data');
