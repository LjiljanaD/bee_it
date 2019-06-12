<?php
namespace Drupal\beeit\Form;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\State\StateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class BeeItSettingsForm extends ConfigFormBase
{
  /**
   * State service
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * BeeItSettingsForm constructor.
   * @param ConfigFactoryInterface $config_factory
   * @param StateInterface $state
   */
  public function __construct(ConfigFactoryInterface $config_factory, StateInterface $state)
  {
    parent::__construct($config_factory);
    $this->state = $state;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container)
  {
    return new static(
      $container->get('config.factory'),
      $container->get('state')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId()
  {
    return 'beeit_settings_form';
  }

  protected function getEditableConfigNames() {
    return;
  }

  public function buildForm(array $form, FormStateInterface $form_state)
  {
    $form['email'] = array(
      '#type' => 'textfield',
      '#title' => t('Email'),
      '#description' => t('Default mail address to send forms'),
      '#default_value' => $this->state->get('email')
    );

    return parent::buildForm($form, $form_state);
  }
  public function validateForm(array &$form, FormStateInterface $form_state)
  {
    // Assert the email is valid
    if (!$form_state->getValue('email') ||
      !filter_var($form_state->getValue('email'), FILTER_VALIDATE_EMAIL)) {
      $form_state->setErrorByName('email', $this->t('Please enter valid email address.'));
    }
  }
  public function submitForm(array &$form, FormStateInterface $form_state)
  {
    parent::submitForm($form, $form_state);
    $this->state->set('email', $form_state->getValue('email'));
  }

  }