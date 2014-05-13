<?php
namespace Craft;


class MediaflowPlugin extends BasePlugin {

    public function getName()
    {
        return Craft::t('Mediaflow');
    }

    public function getVersion()
    {
        return '0.0.1';
    }

    public function getDeveloper()
    {
        return 'KeyTeq Labs';
    }

    public function getDeveloperUrl()
    {
        return 'http://keyteq.no';
    }


    protected function defineSettings()
    {
        return array(
            'url' => array(AttributeType::String, 'required' => true, 'label' => 'URL', 'default' => Craft::t('Mediaflow URL')),
            'username' => array(AttributeType::String, 'required' => true, 'label' => 'Username', 'default' => Craft::t('Username')),
            'apiKey' => array(AttributeType::String, 'required' => true, 'label' => 'API Key', 'default' => Craft::t('API key'))
        );
    }

    public function getSettingsHtml()
    {
        return craft()->templates->render('mediaflow/settings', array(
            'settings' => $this->getSettings()
        ));
    }


    public function prepSettings($settings)
    {
        return $settings;
    }


    public function hasCpSection()
    {
        return true;
    }
    public function registerCpRoutes()
    {
        return array(
            'mediaflow/check' => array('action' => 'mediaflow/settings/testConnection'),
            'mediaflow/media' => array('action' => 'mediaflow/settings/listMedia'),
            'mediaflow/upload' => array('action' => 'mediaflow/settings/upload'),
        );
}
} 