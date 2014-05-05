<?php

namespace Craft;

require __DIR__.'/../vendor/autoload.php';

use Keyteq\Keymedia\KeymediaClient;
class Mediaflow_SettingsController extends BaseController {
    public function actionTestConnection() {
        $settings = craft()->plugins->getPlugin('mediaflow')->getSettings();

        $client = new KeymediaClient($settings->username, $settings->url, $settings->apiKey);

        $this->returnJson($client->isConnected());
    }
    public function actionListMedia() {
        $settings = craft()->plugins->getPlugin('mediaflow')->getSettings();

        $client = new KeymediaClient($settings->username, $settings->url, $settings->apiKey);
        $out = array();
        foreach($client->listMedia() as $k => $item) {
            $out[$k] = $item->toArray();
            $out[$k]['thumbnailUrl'] = $item->getThumbnailUrl(150,150);
            $out[$k]['isImage'] = $item->isImage();
        }
        $this->returnJson($out);
    }
} 