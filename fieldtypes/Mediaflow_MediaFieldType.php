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
        $id = craft()->templates->formatInputId($name);
        $class = get_class($this->element);
        $inMatrix = $class === 'Craft\Mediaflow_MediaFieldType';
        return craft()->templates->render('mediaflow/input', array(
            'inMatrix' => $inMatrix,
            'id' => $id,
            'name'  => $name,
            'value' => $value
        ));
    }

    public function defineContentAttribute()
    {
        return AttributeType::Mixed;
    }
}