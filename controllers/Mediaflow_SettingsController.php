<?php

namespace Craft;

require __DIR__.'/../vendor/autoload.php';

use Keyteq\Keymedia\KeymediaClient;
class Mediaflow_SettingsController extends BaseController {

    private $previewWidth = 150;
    private $previewHeight = 150;
    private $settings;

    public function __construct() {
        $craft = craft();
        $craft->log->removeRoute('WebLogRoute');
        $craft->log->removeRoute('ProfileLogRoute');
        $this->settings = $craft->plugins->getPlugin('mediaflow')->getSettings();
    }

    public function actionTestConnection() {
        try {
            $client = $this->_client($this->settings);
        } catch (\Exception $e) {
            return $this->returnJson(false);
        }

        $this->returnJson($client->isConnected());
    }
    public function actionListMedia() {
        $client = $this->_client($this->settings);
        $request = craft()->request;
        $search = $request->getParam('q', false);
        $results = $client->listMedia(false, $search);
        $out = array();
        foreach($results as $k => $item) {
            $out[$k] = $item->toArray();
            $out[$k]['thumbnailUrl'] = $item->getThumbnailUrl($this->previewWidth, $this->previewHeight);
            $out[$k]['isImage'] = $item->isImage();
        }
        $this->returnJson($out);
    }

    public function actionUpload() {
        $client = $this->_client($this->settings);
        $client->postMedia($_FILES['file']['tmp_name'], $_FILES['file']['name']);
        $this->returnJson($_FILES);
    }

    protected function _client($settings) {
        return new KeymediaClient(
            $this->settings->username,
            $this->settings->url,
            $this->settings->apiKey
        );
    }
}
