<?php
function joshrigg_enqueue_styles() {
    wp_enqueue_style('theme', get_template_directory_uri() . '/css/theme.css' );
  }
  
  add_action('wp_enqueue_styles', 'joshrigg_enqueue_styles');
  
  
  function joshrigg_enqueue_scripts() {
    wp_enqueue_style('theme', get_template_directory_uri() . '/js/theme.js' );
  }
  add_action('wp_enqueue_scripts', 'joshrigg_enqueue_scripts');
  