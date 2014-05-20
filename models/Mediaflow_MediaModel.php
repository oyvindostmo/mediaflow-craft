<?php
namespace Craft;

class Mediaflow_MediaModel extends BaseModel
{
    protected $host = null;

    public function setHost($host) {
        $this->host = $host;
    }

	/**
	 * @access protected
	 * @return array
	 */
	protected function defineAttributes()
	{
		return array_merge(parent::defineAttributes(), array(
			'id'    => AttributeType::String,
			'name'    => AttributeType::String,
			'isImage'    => AttributeType::Bool,
			'thumb'    => AttributeType::String,
			'file' => AttributeType::Mixed,
		));
	}

    public function url(array $options = array()) {
        $options += array(
            'width' => false,
            'height' => false,
            'quality' => false,
            'crop' => true,
            'ending' => $this->file['ending']
        );
        if (!$options['width'] && !$options['height']) {
            throw new \Exception("width or height must be specified for media.url()");
        }

        $width = $options['width'];
        $height = $options['height'];
        $ratio = $this->file['ratio'];
        $quality = $options['quality'];
        $ending = $options['ending'];

        $height = $height ?: floor($width * $ratio);
        $width = $width ?: floor($height * $ratio);

        $size = "{$width}x{$height}";
        if ($quality) $size .= "q{$quality}";

        $url = '//' . $this->host . "/{$size}/{$this->id}{$ending}";
        if (!$options['crop']) {
            $url .= '?original=1';
        }
        return $url;
    }
}
