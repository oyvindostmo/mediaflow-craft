<?php

namespace Craft;

require __DIR__.'/../vendor/autoload.php';

use Keyteq\Keymedia\KeymediaClient;
class Mediaflow_SettingsController extends BaseController {

    private $previewWidth = 150;
    private $previewHeight = 150;

    public function actionTestConnection() {
        $settings = craft()->plugins->getPlugin('mediaflow')->getSettings();
        try {
            $client = new KeymediaClient($settings->username, $settings->url, $settings->apiKey);
        } catch (\Exception $e) {
            return $this->returnJson(false);
        }

        $this->returnJson($client->isConnected());
    }
    public function actionListMedia() {
        $settings = craft()->plugins->getPlugin('mediaflow')->getSettings();

        $client = new KeymediaClient($settings->username, $settings->url, $settings->apiKey);
        $out = array();
        foreach($client->listMedia() as $k => $item) {
            $out[$k] = $item->toArray();
            $out[$k]['thumbnailUrl'] = $item->getThumbnailUrl($this->previewWidth, $this->previewHeight);
            $out[$k]['isImage'] = $item->isImage();
        }
        $this->returnJson($out);
    }

    public function actionUpload($a) {
        $this->returnJson($a);
    }
} 