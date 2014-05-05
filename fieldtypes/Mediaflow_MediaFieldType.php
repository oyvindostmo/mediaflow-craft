<?php
namespace Craft;

class Mediaflow_MediaFieldType extends BaseFieldType
{
    public function getName()
    {
        return Craft::t('Mediaflow item');
    }

    public function getInputHtml($name, $value)
    {
        return craft()->templates->render('mediaflow/input', array(
            'name'  => $name,
            'value' => $value
        ));
    }

    public function defineContentAttribute()
    {
        return AttributeType::Mixed;
    }
}