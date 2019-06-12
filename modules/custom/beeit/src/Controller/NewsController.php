<?php

namespace Drupal\beeit\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Response;
use Drupal\Core\Mail\MailManagerInterface;

class NewsController extends ControllerBase {

  protected $request;
  protected $state;

  private $_email;

  public static function create(ContainerInterface $container)
  {
    return new static(
      \Drupal::request(),
      $container->get('state')
    );
  }

  public function __construct($request, $state)
  {

    $this->request = $request;
    $this->state = $state;

    $this->_email = $state->get('email');

  }

  protected function validEmailAddress($email)
  {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
  }


  public function send()
  {

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');

        $validationErrors = [];
        $validators = [
          'email' => 'required',
        ];

        foreach ($validators as $k => $v) {
          if ($v == 'required') {
            if (empty($this->request->get($k))) {
              $validationErrors[] = [$k];
            }
          }
        }

    $mailManager = \Drupal::service('plugin.manager.mail');
    $module = 'beeit';
    $key='newsletter';
    $to = $this->_email;
    $langcode= 'en';
    $params = [
      'subject' => 'Newsletter email',
      'body' =>  $this->request->get('email'),
    ];
    $send = true;

    $results = $mailManager->mail($module,$key,$to,$langcode,$params,NULL,$send);

    if ($results['result'] !== true) {
      drupal_set_message(t('There was a problem sending your message and it was not sent.'), 'error');
    }
    else {
      drupal_set_message(t('Your message has been sent.'));
    }

    $response->setContent(json_encode(['success' => 1]));
    return $response;
  }

}