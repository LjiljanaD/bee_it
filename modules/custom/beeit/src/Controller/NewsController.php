<?php

namespace Drupal\beeit\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RequestStack;

class NewsController extends ControllerBase {

  protected $request;

  public function __construct(RequestStack $request)  {

    $this->request = $request->getCurrentRequest();
  }

  public static function create(ContainerInterface $container)  {

    return new static(
    $container->get('request_stack')
    );
  }

  public function send()  {
$a=1;
  $email = !empty($this->request->get('email')) ? $this->request->get('email') : ''; 

  return array(
    '#email' => $email,
  );
  }
}